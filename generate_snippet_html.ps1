
# 1. Define Paths
$DocPath = "d:\TFS\Github\Project Infradyne\apps\KAFFAH\khaffah-frontend\kaffah-documentation"
$FrontendPath = "d:\TFS\Github\Project Infradyne\apps\KAFFAH\khaffah-frontend"
$VSCodePath = "$FrontendPath\.vscode"
$HtmlPath = "$DocPath\snippet.html"

# 2. Read Snippets
Write-Host "Reading snippets from $VSCodePath..."
$snippetsData = @{}
if (Test-Path $VSCodePath) {
    Get-ChildItem -Path $VSCodePath -Filter "*.code-snippets" | ForEach-Object {
        Write-Host "Processing $($_.Name)..."
        $content = Get-Content $_.FullName -Raw -Encoding UTF8
        
        # DEBUG: Show first 100 chars
        Write-Host "  Start: $($content.Substring(0, [Math]::Min(50, $content.Length)))"

        # Improved JSONC cleanup
        # 1. Remove Multi-line comments /* ... */
        $content = $content -replace "(?s)/\*.*?\*/", ""
        # 2. Remove Single-line comments // ... (Multilne mode enabled)
        $content = $content -replace "(?m)^\s*//.*$", ""
        # 3. Remove inline // comments (risky if inside string, but rare in snippets JSON key)
        # Better: remove // that comes after a non-quote, non-colon? Hard in regex.
        # Let's stick to line-based removal for now.
        
        # 4. Trailing Commas: , followed by newline/space roughly
        $content = $content -replace ",(\s*[\}\]])", "$1"
        
        try {
            if (-not [string]::IsNullOrWhiteSpace($content)) {
                $json = $content | ConvertFrom-Json
                $snippetsData[$_.Name] = $json
                Write-Host "  Success: $($_.Name) - Keys: $($json.PSObject.Properties.Name -join ', ')"
            }
        } catch {
            Write-Host "  Error parsing $($_.Name): $($_.Exception.Message)"
            # DEBUG: Print content sample where it might have failed
            Write-Host "  Content Sample: $($content.Substring(0, [Math]::Min(200, $content.Length)))"
        }
    }
}

$snippetsJson = $snippetsData | ConvertTo-Json -Depth 10 -Compress

# 3. Inject into HTML
$htmlContent = Get-Content $HtmlPath -Raw
# Find variable assignment block
$parts = $htmlContent -split "const snippetsData ="
if ($parts.Length -eq 2) { 
    $pre = $parts[0]
    $rest = $parts[1]
    # Find next declaration to end the block
    $endIdx = $rest.IndexOf("const cleanSnippetCode")
    if ($endIdx -ge 0) {
        $post = $rest.Substring($endIdx)
        $newHtmlContent = $pre + "const snippetsData = " + $snippetsJson + ";" + [Environment]::NewLine + "        " + $post
        $newHtmlContent | Out-File -FilePath $HtmlPath -Encoding UTF8
        Write-Host "Done. Data injected."
    } else {
        Write-Host "Error: Could not find end marker in HTML."
    }
} else {
    Write-Host "Error: Could not find snippetsData marker."
}
