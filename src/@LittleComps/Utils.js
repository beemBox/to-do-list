export default class Utils {
  static formatDate(date) {
    date = new Date(date)
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if (month < 10)
      return `${day}-0${month}-${year}`
    else
      return `${day}-${month}-${year}`
  }

  static filterObjectTypeofName(mutationTargetName) {
    if (mutationTargetName.toString().match(/\[(.+)\]/)) {
      mutationTargetName = mutationTargetName
        .toString().replace(/\[|\]/g, '')

      if (mutationTargetName.match(/\s/) && mutationTargetName.toLowerCase().match(/\object/))
        mutationTargetName = mutationTargetName.toString().split(' ')[1].toLowerCase()

      return mutationTargetName
    } else return mutationTargetName
  }
}