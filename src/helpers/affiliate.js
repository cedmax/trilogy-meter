import locale from 'locale2'

let affiliate = {
  domain: 'amazon.co.uk',
  tag: 'cedmax-21'
}

if (locale === 'it-IT') {
  affiliate = {
    domain: 'amazon.it',
    tag: 'cedmax03-21'
  }
}

export default affiliate
