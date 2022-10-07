export function sortMessag(messages) {
    return messages.sort((messag1, messag2) =>{
    let mesTime1 = messag1.messagTime.replaceAll(':','')
    let mesDate1 = messag1.messagDate.split('.').reverse().join('')
    let date1 = Number(mesDate1 + mesTime1)
    let mesTime2 = messag2.messagTime.replaceAll(':','')
    let mesDate2 = messag2.messagDate.split('.').reverse().join('')
    let date2 = Number(mesDate2 + mesTime2)
    return (date1 - date2)*-1
 })
}