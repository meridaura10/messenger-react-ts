export function SortUsersSearch(users,myId) {
    users.sort((user1, user2) =>{
        if (user1.lastAction && user2.lastAction) {
            let userTime1 = user1.lastAction[myId].messagTime.replaceAll(':','') 
            let userDate1 = user1.lastAction[myId].messagDate.split('.').reverse().join('') 
            let date1 = Number(userDate1 + userTime1)
            let userTime2 = user2.lastAction[myId].messagTime.replaceAll(':','') 
            let userDate2 = user2.lastAction[myId].messagDate.split('.').reverse().join('') 
            let date2 = Number(userDate2 + userTime2)
            console.log((date1 - date2));
            return (date1 - date2)*-1   
        }
})
}