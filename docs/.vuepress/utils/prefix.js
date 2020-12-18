function addPrefix(data, prefix) {
  return [`${prefix}/${data[0]}`, data[1]]
}

module.exports = addPrefix
