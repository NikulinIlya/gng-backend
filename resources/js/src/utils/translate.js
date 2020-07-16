const translatePhrase = (dictionary = {}, id, fallback) => {
    if (!dictionary) return fallback;
    return dictionary[id] ? dictionary[id] : fallback;
};

export default translatePhrase;
