module.exports = ({ clients }) => {
  const { length } = clients

  switch (length) {
    case 1: return 'you are all alone'
    case 2: return 'there is 1 other here'
    default: return `there are ${length-1} others here`
  }
}