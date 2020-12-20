const requests = {
    sendMessage(ss) {
        console.log('------ ', ss)
    },
    getMessages() {
        return 1
    },
    getUsers() {
        return 1
    },
    registerUser() {
        return console.error('Faux Error.  ')
    }
    
}

export default requests;