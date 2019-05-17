function Character() {
    var self = this;

    self.name = "";
    self.hp = 10;
    self.mana = 10;
    self.stamina = 10;
    self.gender = null;
    self.class = null;
    self.abs = null;
    self.cbs = null;

}
var player;

function main() {
    player = new Character();
    document.addEventListener("click", function (event) {
        if (event.target.dataset.click) {
            console.log("Data:", event.target.dataset)
            window[event.target.dataset.click]();
        }
    })
}

function saveCharacter() {
    player.name = qsd("player-name").value;
    player.gender = Array.from(qsda('player-gender')).reduce((a, c) => c.checked ? c.value : a)
    player.class = Array.from(qsda('player-class')).reduce((a, c) => c.checked ? c.value : a)
    player.abs = Array.from(qsda('player-abs')).reduce((a, c) => c.checked ? c.value : a)
    player.cbs = Array.from(qsda('player-cbs')).reduce((a, c) => c.checked ? c.value : a)
    console.log("player:", player);
}

// Helpers
function qsd(datatag) {
    return document.querySelector('[data-' + datatag + ']')
}

function qsda(datatag) {
    return document.querySelectorAll('[data-' + datatag + ']')
}

// end helpers
main();