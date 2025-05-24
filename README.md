## How To Run And Serve the documentations

- install & setup the python virtual environments on your current work directory

```
python3 -m venv .venv
```
- activate the virtual environment

on windows
```
.venv/scripts/activate
```

- install the python requirements.txt
```
python3 -m pip install -r requirements.txt
```


## Serve Using Docker

```
docker compose up -d --build
```


documentations-for-weekly-reports
```
mkdocs serve --dev-addr 0.0.0.0:5990 --config-file mkdocs-soc-reports.yml
```

documentation-for-playgrounds
```
mkdocs serve --dev-addr 0.0.0.0:5999 --config-file mkdocs.yml
```

## This Repository Is A Merged Repository From Previous Deprecated Repositories

- https://github.com/TFSID/TFS---Cyber-Security (TFS---Cyber-Security)
- https://github.com/TFSID/CyberSecIntelligence (CyberSecIntelligence)



It Will Be a documentation for being a better soc analyst


## Security Operation Center

### Tier 3 - Threats Hunter

Jobs & Capability 
- SIEM & XDR Tuning
    - Rules Creations
- Threat Intelligence Hunting & Reportings
    - Collecting for IoCs that relevant with the companies
        - Alienvault
        - Wappalyzer
        - CVE Details
        - Security Online

- Labs
    - Labs For Evaluating the SIEM Rules and XDR Detection

SkILLS & Knowledge
- Mathematics
- Technologies


### Developing Sigma Rules

### Threat Hunting & Investigations Tools

- [FireEye Market](https://fireeye.market/) 

Create And IOC Using [OpenIOC](https://fireeye.market/apps/211404)

Convert OpenIOC To STIX Using [OpenIOC-to-STIX-Converter](https://github.com/STIXProject/openioc-to-stix/tree/master)


### Reportingds Tools And Weekly Formats

- Reports Threats That Founds By Threat Intelligencces
- Reports IoC That Founds By Threat Intelligences
- Reporting Vulnerabilities Priority That Found On Their Assets
- Provide A Recommendations For Their Security Best Practice 





Findings Alerts Analytics
Analyzing Alerts and Check Behavior and detections

ELK & Trendmicro XDR


Checking For False Positives Alerts
Checking For Repetitive Alerts

