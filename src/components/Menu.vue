<template>
  <div class="frame" role="application" aria-label="やまPay">
    <div class="brand">やまPay</div>
    <div id="welcome" class="welcome">
      ようこそ<span id="username" v-text="this.authStore.userId" />さん
    </div>

    <div class="balance-wrap">
      <div class="small-label">やま残高</div>
      <div class="balance" id="balance">
        {{ this.authStore.balance }}<span class="unit">やま</span>
      </div>
    </div>

    <div class="actions">
      <button class="action charge" id="btnCharge" @click="toCharge">
        <span>チャージ</span>
      </button>
      <button class="action pay" id="btnPay1">
        <span>支払う</span>
      </button>
      <button class="action history" id="btnPay2"><span>取引履歴</span></button>
    </div>

    <div class="mascot-area">
      <img class="mascot" :src="mascotImage" alt="やまのマスコット" />
      <div class="balloon3-right-btm">
        <p v-html="mascotLine" />
      </div>
    </div>
  </div>
</template>

<script>
import { useModeStore } from "@/stores/mode";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

export default {
  name: "MenuView",
  setup() {
    const modeStore = useModeStore();

    // 画像はリアクティブのまま参照
    const mascotImage = modeStore.$state.mascotImage;

    // 吹き出しメッセージは「表示時に1回だけランダム」
    const mascotLine = ref(modeStore.getRandomMessage());

    // 認証情報
    const authStore = useAuthStore();

    return {
      mascotImage,
      mascotLine,
      authStore,
    };
  },
  methods: {
    // チャージ画面移動
    toCharge() {
      // 一旦アラート出すだけ
      alert("チャージ画面へ移動します");
      // ✅ ログイン成功 → メニュー画面へ遷移
      this.$router.push({ name: 'charge'})
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
:root {
  --blue: #0aa0ff;
  --blue-dark: #008edd;
  --bg: #ffffff;
  --card: #dff5ff;
  font-family: "Hiragino Kaku Gothic ProN", Meiryo, "Noto Sans JP", sans-serif;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--blue-dark);
  display: flex;
  justify-content: center;
  padding: 24px;
}

.frame {
  width: 400px;
  max-width: 94vw;
}

.brand {
  text-align: center;
  font-size: 56px;
  font-weight: 700;
  color: var(--blue-dark);
  margin: 18px 0;
}

.welcome {
  text-align: center;
  font-size: 24px;
  margin-bottom: 12px;
  color: var(--blue-dark);
  font-weight: 600;
}

.balance-wrap {
  background: var(--card);
  border: 6px solid var(--blue);
  border-radius: 24px;
  padding: 16px 18px;
  text-align: center;
  margin-bottom: 20px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.small-label {
  font-size: 18px;
}

.balance {
  font-size: 36px;
  font-weight: 700;
}

.balance .unit {
  font-size: 18px;
  margin-left: 6px;
}

.actions {
  display: flex;
  gap: 14px;
  justify-content: space-between;
  margin-bottom: 40px;
}

/* ボタン本体 */
.action {
  position: relative;
  flex: 1;
  border-radius: 18px;
  border: 6px solid var(--blue);
  min-height: 120px; /* 画像分の高さ確保 */
  font-size: 18px;
  color: var(--blue-dark);
  cursor: pointer;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* テキストは上に配置 */
  align-items: center;
  padding-top: 12px;
}

.action span {
  z-index: 1;
}

/* イラスト共通 */
.action::after {
  content: "";
  position: absolute;
  bottom: -100%; /* 初期は見えない */
  left: 50%;
  transform: translateX(-50%);
  width: 85px;
  height: 85px;
  background-size: contain;
  background-repeat: no-repeat;
  transition: bottom 0.4s ease;
}

/* hoverでキャラ出現 */
.action:hover::after {
  bottom: -30px;
}

/* 各ボタン用イラスト */
.charge::after {
  background-image: url("/public/images/charge.png");
}
.pay::after {
  background-image: url("/public/images/pay.png");
}
.history::after {
  background-image: url("/public/images/history.png");
}

.mascot-area {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  position: relative; /* 吹き出しの基準にする */
}

.mascot {
  width: 150px;
}

.balloon3-right-btm {
  position: absolute;
  top: 20px; /* マスコットからの距離を相対的に調整 */
  left: 160px; /* マスコットの右横あたりに配置 */
  display: inline-block;
  padding: 15px;
  width: 200px;
  line-height: 20px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  background: #008edd;
  border-radius: 50%;
  box-sizing: border-box;
}

.balloon3-right-btm:before {
  content: "";
  position: absolute;
  top: 50%;
  left: -25px;
  margin-top: -15px;
  border: 15px solid transparent;
  border-right: 15px solid #008edd;
}

body.hard {
  --blue: #ff2222;
  --blue-dark: #cc0000;
  --bg: #111;
  --card: #330000;
}
</style>
