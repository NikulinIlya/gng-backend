const translatePhrase = (dictionary = {}, slug, fallback) => {
    if (!dictionary) return fallback;
    return dictionary[slug] ? dictionary[slug] : fallback;
};

export default translatePhrase;
