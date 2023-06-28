Hooks.once("polyglot.init", (ED4LanguageProvider) => {
    export class EarthdawnV4LanguageProvider extends LanguageProvider {
	get originalTongues() {
			return {
				human: "thorass",
				dwarven: "dethek",
				elven: "espruar",
				windling: "oldethorass",
				obsidiman: "dethek",
				troll: "jungleslang",
				ork: "dethek",
				tskrang: "iokharic",
			};
		}
		get settings() {
			return {
				LanguageRegex: {
					type: String,
					default: game.i18n.localize("POLYGLOT.Generic.Language"),
				},
				LiteracyRegex: {
					name: "Literacy Regex",
					hint: "Same as Language Regex, but for written languages.",
					type: String,
					default: "Speak",
				},
			};
		}
		async getLanguages() {
			for (let lang in this.originalTongues) {
				this.languages[lang] = game.i18n.localize(`earthdawn.l.language${lang.capitalize()}`);
			}
		}
		getUserLanguages(actor) {
			let knownLanguages = new Set();
			let literateLanguages = new Set();
			for (let lang in actor.system.speak.languages) {
				if (actor.system.speak.languages[lang]) knownLanguages.add(lang);
			}
			for (let lang in actor.system.languages.write) {
				if (actor.system.write.languages[lang]) literateLanguages.add(lang);
			}
			if (actor.system.languages.other) {
				const languageRegex = game.settings.get("polyglot", "LanguageRegex");
				const literacyRegex = game.settings.get("polyglot", "LiteracyRegex");
				for (let lang of actor.system.languages.other.split(/[,;]/)) {
					const languageMatch = lang.match(languageRegex + " \\((.+)\\)", "i");
					const literacyMatch = lang.match(literacyRegex + " \\((.+)\\)", "i");
					if (languageMatch || literacyMatch) {
						if (languageMatch) knownLanguages.add(languageMatch[1].trim().toLowerCase());
						else if (literacyMatch) literateLanguages.add(literacyMatch[1].trim().toLowerCase());
					} else {
						knownLanguages.add(lang.trim().toLowerCase());
						literateLanguages.add(lang.trim().toLowerCase());
					}
				}
			}
			return [knownLanguages, literateLanguages];
		}
	
		conditions(lang) {
			return game.polyglot.literateLanguages.has(lang);
		}
	}
    polyglot.registerModule("ed4-language-provider", EarthdawnV4LanguageProvider)
})



	