Hooks.once("polyglot.init", (ED4LanguageProvider) => {
    class EarthdawnV4LanguageProvider extends LanguageProvider {
        get originalAlphabets() {
            return {
                "dwarf": "130% Thorass",
                "human": "120% Dethek",
                "troll": "140% Tengwar",
                "ork": "150% Espruar"
            };
        }
        get originalTongues() {
            return {
                "_default": "dwarf",
                "dwarf": "dwarf",
                "human": "human",
                "ork": "ork",
                "windling": "dwarf",
                "tskrang": "human",
                "obsidiman": "ork",
                "troll": "troll"
            };
        }
        getUserLanguages(actor) {
            let known_languages = new Set();
            let literate_languages = new Set();
            for (let lang of actor.data.data.attributes.languages.value)
                known_languages.add(lang)
            return [known_languages, literate_languages];
        }
    }
    polyglot.registerModule("ed4-language-provider", EarthdawnV4LanguageProvider)
})