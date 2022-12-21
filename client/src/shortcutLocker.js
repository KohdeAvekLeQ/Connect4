let lockedShortcut = false;

exports.lockShortcut = function lockShortcut() {
    lockedShortcut = true;
};

exports.unlockShortcut = function unlockShortcut() {
    lockedShortcut = false;
};

exports.isShortcutLocked = function isShortcutLocked() {
    return lockedShortcut;
};
