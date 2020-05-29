const modifyNotification = (text) => {
    document.getElementById("notification-text").textContent = text
    document.getElementById("notification-overlay").style.display = "block"
    setTimeout(() => {
        document.getElementById("notification-overlay").style.display = "none";
    }, 1500)
}
export default { modifyNotification }