import logging

from bs4 import BeautifulSoup
from mkdocs.structure.pages import Page

def on_pre_build(html: str, logger):
    soup = BeautifulSoup(html, "html.parser")
    body = soup.find("body")
    body["style"] = "background: skyblue !important;"
    return str(soup)

def inject_background(html: str) -> str:
    soup = BeautifulSoup(html, 'html.parser')
    style_tag = soup.new_tag('style')
    style_tag.string = """
    @page {
        background-color: skyblue !important;
    }
    """
    soup.head.append(style_tag)
    return str(soup)

def inject_link(html: str, href: str,
                page: Page, logger: logging) -> str:
    """Adding PDF View button on navigation bar(using material theme)"""

    def _pdf_icon():
        _ICON = '''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path d="M128,0c-17.6,0-32,14.4-32,32v448c0,17.6,14.4,32,32,32h320c17.6,0,32-14.4,32-32V128L352,0H128z" fill="#E2E5E7"/>
<path d="m384 128h96l-128-128v96c0 17.6 14.4 32 32 32z" fill="#B0B7BD"/>
<polygon points="480 224 384 128 480 128" fill="#CAD1D8"/>
<path d="M416,416c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V256c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16  V416z" fill="#F15642"/>
<g fill="#fff">
<path d="m101.74 303.15c0-4.224 3.328-8.832 8.688-8.832h29.552c16.64 0 31.616 11.136 31.616 32.48 0 20.224-14.976 31.488-31.616 31.488h-21.36v16.896c0 5.632-3.584 8.816-8.192 8.816-4.224 0-8.688-3.184-8.688-8.816v-72.032zm16.88 7.28v31.872h21.36c8.576 0 15.36-7.568 15.36-15.504 0-8.944-6.784-16.368-15.36-16.368h-21.36z"/>
<path d="m196.66 384c-4.224 0-8.832-2.304-8.832-7.92v-72.672c0-4.592 4.608-7.936 8.832-7.936h29.296c58.464 0 57.184 88.528 1.152 88.528h-30.448zm8.064-72.912v57.312h21.232c34.544 0 36.08-57.312 0-57.312h-21.232z"/>
<path d="m303.87 312.11v20.336h32.624c4.608 0 9.216 4.608 9.216 9.072 0 4.224-4.608 7.68-9.216 7.68h-32.624v26.864c0 4.48-3.184 7.92-7.664 7.92-5.632 0-9.072-3.44-9.072-7.92v-72.672c0-4.592 3.456-7.936 9.072-7.936h44.912c5.632 0 8.96 3.344 8.96 7.936 0 4.096-3.328 8.704-8.96 8.704h-37.248v0.016z"/>
</g>
<path d="m400 432h-304v16h304c8.8 0 16-7.2 16-16v-16c0 8.8-7.2 16-16 16z" fill="#CAD1D8"/>
</svg>
'''  # noqa: E501
        return BeautifulSoup(_ICON, 'html.parser')

    logger.info(f'(hook on inject_link: {page.title})')
    soup = BeautifulSoup(html, 'html.parser')

    nav = soup.find(class_='md-header-nav')
    if not nav:
        # after 7.x
        nav = soup.find('nav', class_='md-header__inner')
    if nav:
        a = soup.new_tag('a', href=href, title='PDF',
                         **{'class': 'md-header__button md-header-nav__button md-icon'})
        a.append(_pdf_icon())
        nav.append(a)
        return str(soup)

    return html


# def pre_js_render(soup: BeautifulSoup, logger: logging) -> BeautifulSoup:
#     logger.info('(hook on pre_js_render)')
#     return soup


# def pre_pdf_render(soup: BeautifulSoup, logger: logging) -> BeautifulSoup:
#     logger.info('(hook on pre_pdf_render)')
#     tag = soup.find(lambda tag: tag.name ==
#                     'body' and 'data-md-color-scheme' in tag.attrs)
#     if tag:
#         tag['data-md-color-scheme'] = 'print'
#     return soup

def pre_pdf_render(soup: BeautifulSoup, logger: logging) -> BeautifulSoup:
    logger.info('(hook on pre_pdf_render)')
    
    body = soup.find('body')
    table = soup.find('table')
    if table:
        new_parent = soup.new_tag("div")
        new_parent["class"] = "flex-table-center"
        new_parent['style'] = (
            "display: flex; "
            "justify-content: center;"
            )
        table.insert_before(new_parent)
        new_parent.append(table)
        logger.info(f'table telah di restruktur ke dalam div')
    else:
        logger.warn(f"Elemen <table> tidak ditemukan untuk halaman")
    if body:
        
        body['style'] = (
            
            "background-image: url('https://raw.githubusercontent.com/TFSID/images-cdn/fa69fe1ed6a1b7112927c7ce8e6238d68ed2afc1/background-transparent-rev1.png');"
            "background-color: rgba(255, 255, 255, 0.7); "
            "background-size: cover;"
            "background-position: center;"
            # "background-image: skyblue !important; "
            # "background: skyblue !important; "
            "background-size: cover; "
            "background-position: center; "
            "background-repeat: no-repeat; "
            "background-attachment: fixed;"
        )
        logger.info(f'Background image berhasil ditambahkan untuk halaman')
    else:
        logger.warning(f'Elemen <body> tidak ditemukan untuk halaman')
    tag = soup.find(lambda tag: tag.name ==
                    'body' and 'data-md-color-scheme' in tag.attrs)
    if tag:
        tag['data-md-color-scheme'] = 'print'
    return soup