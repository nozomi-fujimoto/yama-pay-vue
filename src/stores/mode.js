// src/stores/counter.js
import { defineStore } from "pinia";

export const useModeStore = defineStore('yama-state', {
    state: () => ({
        mascotImage: "",
        mascotLines: [
        ],
        paySounds :[
        ],
        payFailedSounds :[
        ]
    }),
    actions: {
        changeToHardMode() {
            // ハードモードに入れ替え
            this.mascotImage = "/images/yama_pay_hard.png"
            // セリフセットもハードモードように変更
            this.mascotLines = [
                "ハードモードだよ",
                "厳しいこと言わるから気を付けて",
                "注意！ハードモードです",
                "こんなの見つけるなんて暇なの？"
            ];
            this.paySounds = [
                "/voices/もったいねーver1.mp3"
            ];
            this.payFailedSounds = [
                "/voices/この貧乏人ver1.mp3",
                "/voices/そんな残高でver1.mp3",
                "/voices/ダッッサver1.mp3",
                "/voices/決済するって言ったのお前ver1.mp3",
                "/voices/限界？ver1.mp3",
                "/voices/自分で決めたんならver1.mp3",
                "/voices/情けなver1.mp3"
            ]
        },
        changeToNormalMode() {
            // ノーマルモードに入れ替え
            this.mascotImage = "/images/yama.png";
            // セリフセットもハードモードように変更
            this.mascotLines = [
                "今日はパーっと<br>いっちゃう？",
                "今日も一日おつかれさま",
                "やまPayは<br>いつでも<br>貴方のそばに",
                "一息入れちゃう？"
            ];
            this.paySounds =[
                "/voices/やまペイver1.mp3"
            ];
            this.payFailedSounds = [
                "/voices/お金に困ってるなら相談乗るよver1.mp3",
                "/voices/ちょっと足りなかったねver1.mp3",
                "/voices/俺も残高見ておくべきだったねver3.mp3"
            ]
        },
        getRandomMessage() {
            return this.mascotLines[Math.floor(Math.random() * this.mascotLines.length)];
        },
        getRandomVoice() {
            return this.paySounds[Math.floor(Math.random() * this.paySounds.length)];
        },
        getRandomFailedVoice() {
            return this.payFailedSounds[Math.floor(Math.random() * this.payFailedSounds.length)];
        }
        , paySound() {
            const sound = new Audio(this.getRandomVoice());
            sound.play();
        },
        payFailedSound() {
            const sound = new Audio(this.getRandomFailedVoice());
            sound.play();
        }
    },
    persist: true,
}
);
