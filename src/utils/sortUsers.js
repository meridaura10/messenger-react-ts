export function sortUsers(users) {
     users.sort((user1, user2) =>{
        if (user1.lastAction && user2.lastAction) {
        let userTime1 = user1.lastAction.messagTime.replaceAll(':','') 
        let userDate1 = user1.lastAction.messagDate.split('.').reverse().join('') 
        let date1 = Number(userDate1 + userTime1)
        let userTime2 = user2.lastAction.messagTime.replaceAll(':','') 
        let userDate2 = user2.lastAction.messagDate.split('.').reverse().join('') 
        let date2 = Number(userDate2 + userTime2)
        return (date1 - date2)*-1
        }
 })
}