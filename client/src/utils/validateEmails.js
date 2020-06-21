// emailregex.com (Javascript regular expression option)
// const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// html option 
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default (emails) => {
    const invalidEmails = emails.split(',').map(email => email.trim())
        // if email returns true (succeeds the re test), will be kept in arr by filer, else not
        .filter(email => re.test(email) === false)
    if (invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    }
    // if no invalidEmails, return nothing
    return;
}