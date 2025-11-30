<template>
<div class="frame">
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

    <div class="pay-box">
      <input type="number" v-model="useAmount" id="payAmount" placeholder="支払うやま">
      <button id="btnPay" @click="pay">支払う</button>
      <button id="btnBack" type="button" class="back-btn" @click="return2Menu">
        戻る
      </button>
    </div>
    
    <div class="mascot-area">
      <img id="mascotImg" class="mascot" :src="mascotImage" alt="やまのマスコット" />
     <div class="balloon3-right-btm">
        <p v-html="mascotLine" />
      </div>
    </div>
</div>
</template>

<script>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useModeStore } from "@/stores/mode";

export default {
  name: "PayView",
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
      authStore
    };
  },
  methods: {
    async changeViewModal() {
      // モーダルの表示非表示を変更
      this.isModalOpen = !this.isModalOpen;
    },
    async pay() {
      this.authStore.pay(this.authStore.userId, this.useAmount, "支払い");
    },
    return2Menu() {
      // メニューに戻る
      this.$router.push({ name: 'menu' })
    }
  }
}

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

    .pay-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      margin-top: 16px;
    }

    .pay-box input {
      padding: 8px 12px;
      font-size: 18px;
      width: 300px;
      text-align: center;
      border: 2px solid var(--blue);
    }

    .pay-box button {
      padding: 10px 20px;
      font-size: 18px;
      cursor: pointer;
      background: var(--blue);
      color: #fff;
      border: none;
      border-radius: 8px;
    }

    .pay-box .back-btn {
      padding: 6px 16px;
      font-size: 16px;
      cursor: pointer;
      background: #cce6ff;
      color: var(--blue-dark);
      border: none;
      border-radius: 6px;
      margin-top: 5px;
    }

    .mascot-area {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      position: relative;
    }

    .mascot {
      width: 150px;
    }

    .balloon3-right-btm {
      position: absolute;
      top: 20px;
      left: 160px;
      display: inline-block;
      padding: 15px;
      width: 200px;
      line-height: 20px;
      text-align: center;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      background: var(--blue-dark);
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
      border-right: 15px solid var(--blue-dark);
    }
  </style>