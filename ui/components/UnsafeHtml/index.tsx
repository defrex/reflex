import React, { PureComponent } from 'react'

interface UnsafeHmtlProps {
  children: string
}

export default class UnsafeHmtl extends PureComponent<UnsafeHmtlProps> {
  componentDidMount() {
    this._updateIframe()
  }

  componentDidUpdate() {
    this._updateIframe()
  }

  _updateIframe() {
    const { children } = this.props
    const iframe = this.refs.iframe as HTMLIFrameElement
    if (!iframe.contentDocument) {
      return
    }
    iframe.contentDocument.documentElement.innerHTML = children
    iframe.contentDocument.documentElement.style.height = 'fit-content'
    iframe.contentDocument.documentElement.style.width = 'fit-content'
    iframe.contentDocument.body.style.padding = '0px'
    iframe.contentDocument.body.style.margin = '0px'
    iframe.contentDocument.body.style.height = 'fit-content'
    iframe.contentDocument.body.style.width = 'fit-content'
    iframe.contentDocument.body.style.overflow = 'hidden'
    iframe.style.height =
      iframe.contentDocument.documentElement.scrollHeight + 1 + 'px'
    iframe.style.width =
      iframe.contentDocument.documentElement.scrollWidth + 1 + 'px'
  }

  render() {
    return <iframe ref='iframe' frameBorder='0' />
  }
}
