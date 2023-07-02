Hooks.once("polyglot.init", (LanguageProvider) => {
	let ed4Welcome = new ChatMessage(): "Earthdawn Language Provider has loaded.";
	ChatLog.postOne(message: ed4Welcome,): Promise<void>
    export class earthdawnV4LanguageProvider extends LanguageProvider {
	get originalAlphabets() {
			return {
				arciela: "200% ArCiela",
				aztec: "200% Aztec",
				barazhad: "200% Barazhad",
				celestial: "200% Celestial",
				chinese: "130% ScrapbookChinese",
				cyrillic: "130% KremlinPremier",
				daedra: "200% Daedra",
				darkeldar: "200% DarkEldar",
				davek: "150% Davek",
				dethek: "200% Dethek",
				dovah: "170% DragonAlphabet",
				elderfuthark: "350% ElderFuthark",
				eltharin: "200% Eltharin",
				espruar: "150% Espruar",
				fingeralphabet: "150% FingerAlphabet",
				floki: "200% Floki",
				highdrowic: "150% HighDrowic",
				highschoolrunes: "200% HighschoolRunes",
				infernal: "230% Infernal",
				iokharic: "170% Iokharic",
				jungleslang: "180% JungleSlang",
				kargi: "150% Kargi",
				magescript: "200% MageScript",
				maraseye: "200% MarasEye",
				meroiticdemotic: "200% MeroiticDemotic",
				miroslavnormal: "200% MiroslavNormal",
				musiqwik: "200% MusiQwik",
				nordic: "160% NyStormning",
				oldeenglish: "150% OldeEnglish",
				oldeespruar: "200% OldeEspruar",
				oldethorass: "200% OldeThorass",
				ophidian: "250% Ophidian",
				oriental: "130% Oriental",
				orkglyphs: "200% OrkGlyphs",
				pulsian: "270% Pulsian",
				qijomi: "200% Qijomi",
				reanaarian: "200% Reanaarian",
				rellanic: "200% Rellanic",
				saurian: "200% Saurian",
				semphari: "200% Semphari",
				skaven: "200% Skaven",
				tengwar: "200% Tengwar",
				thassilonian: "200% Thassilonian",
				thorass: "200% Thorass",
				tuzluca: "200% Tuzluca",
				valmaric: "200% Valmaric",
			};
		}
	
		get originalTongues() {
			return { 
				_default: "dwarven",
				dwarven: "elderfuthark",
				elven: "arciela",
				human: "aztec",
				leafer: "dovah",
				obsidiman: "maraseye",
				ork: "orkglyphs",
				tskrang: "saurian",
				talveni: "eltharin",
				troll: "jungleslang",
				windling: "ophidian",
			};
		}
		async getLanguages() {
			const langs = {};
			for (let lang in this.originalTongues) {
				langs[lang] = lang;
			}
			this.languages = langs;
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
    game.polyglot.api.registerModule("ed4-language-provider", earthdawnV4LanguageProvider)
})



	