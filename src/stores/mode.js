// src/stores/counter.js
import { defineStore } from "pinia";

export const useModeStore = defineStore('yama-state', {
    state: () => ({
        mascotImage: "",
        mascotLines: [
        ],
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
        },
        changeToNormalMode() {
            // ノーマルモードに入れ替え
            this.mascotImage = "/images/yama.png",
            // セリフセットもハードモードように変更
            this.mascotLines = [
                "今日はパーっと<br>いっちゃう？",
                "今日も一日おつかれさま",
                "やまPayは<br>いつでも<br>貴方のそばに",
                "一息入れちゃう？"
            ];
        },
        getRandomMessage() {
            return this.mascotLines[Math.floor(Math.random() * this.mascotLines.length)];
        }
    },
    persist: true,
}
);
