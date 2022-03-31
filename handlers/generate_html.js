const domNames = {
    'root-element': 'body',
    section: 'section',
    column: 'div',
    heading: 'h1'
}

function root(req, res) {
    const rootElement = req.body

    if (!(rootElement && Object.keys(rootElement).length)) {
        res.sendStatus(400)
        return
    }

    const bodyHtml = generate(rootElement)
    res.type('html').send(
        `<!doctype html><html lang="en"><head><title>Generated</title><meta charset="UTF-8"></head>${bodyHtml}</html>`
    )
}

function widget2node(o) {
    const settings = o.settings || {}

    const n = {
        name: domNames[o.name],
        text: '',
        id: o.id,
        classList: [],
        children: o.children || []
    }

    let classes = settings.class
    if (classes && classes.length) {
        if (Array.isArray(classes)) classes = classes.join(' ')
        n.classList.push(classes)
    }

    switch (o.name) {
        case 'heading':
            n.text = settings.text
            break
        case 'section':
            n.classList.push('section')
            break
    }

    return n
}

function generate(o) {
    const n = widget2node(o)
    let html = ['<']
    const attrs = {}

    if (n.id && n.id.length) attrs.id = n.id
    if (n.classList && n.classList.length) attrs.class = n.classList.join(' ')

    html.push(n.name)

    const _attrs = Object.entries(attrs)
    if (_attrs.length) {
        const at = []
        for (const [k, v] of _attrs) at.push(`"${k}"="${v}"`)
        if (at.length) html.push(' ' + at.join(' '))
    }

    html.push('>')

    if (n.text && n.text.length) html.push(n.text)

    if (n.children && n.children.length) {
        for (const child of n.children) {
            html.push(generate(child))
        }
    }

    html.push(`</${n.name}>`)

    return html.join('')
}

module.exports = root