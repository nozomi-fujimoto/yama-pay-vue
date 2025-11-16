<template>
    <div class="frame">
    <div class="brand">やまPay</div>
    <div id="welcome" class="welcome">ようこそ<span id="username"></span>さん</div>

    <div class="balance-wrap">
      <div class="small-label">やま残高</div>
      <div class="balance" id="balance">0<span class="unit">やま</span></div>
    </div>

    <div class="charge-box">
      <input type="number" id="chargeAmount" placeholder="チャージするやま" min="1" step="1">
      <button id="btnCharge">チャージする</button>
      <button id="btnBack" type="button" class="back-btn">戻る</button>
    </div>

    <div class="mascot-area">
      <img class="mascot" src="yama_wallet.png" alt="やまのマスコット" />
      <div class="balloon3-right-btm">
        <p>今日はパーっと<br>いっちゃう？</p>
      </div>
    </div>

    <!-- モーダル -->
    <div id="confirmModal" class="modal">
      <div class="modal-content">
        <p>高山の承認を得ましたか？</p>
        <div class="modal-buttons">
          <button id="modalYes">はい</button>
          <button id="modalNo">いいえ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useModeStore } from '@/stores/mode';
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'LoginView',
  setup() {
    const modeStore = useModeStore();
    const authStore = useAuthStore();
    return { modeStore, authStore };
  },
  data() {
    return {
      yamapaySecretMode: false,
      username: "",
      tapCount: 0
    };
  },

  methods: {
    async doLogin() {
      const username = this.username.trim();
      if (username === "") {
        alert("ユーザー名を入力してください");
        return;
      }

      const success = await this.authStore.login(username)

      if (success) {
        // ✅ ログイン成功 → メニュー画面へ遷移
        this.$router.push({ name: 'menu', params: { user: this.authStore.user } })
      } else {
        // ❌ 何もしない
      }
    },

    // 秘密のタップカウント
    secretTap() {
      this.tapCount++;

      if (this.tapCount === 5) {
        alert("あと2回でハードモードに入れます…！");
      }

      if (this.tapCount === 7) {
        alert("ハードモード突入！");
        this.yamapaySecretMode = true;
      }
    },
    // ログイン処理
    handleLogin() {
      // ハードモードフラグが立っていたらハードモードに変更する
      if (this.yamapaySecretMode) {
        this.modeStore.changeToHardMode();
      } else {
        this.modeStore.changeToNormalMode();
      }

      // ログインしたら裏モードは封印
      this.tapCount = 0;
      this.doLogin();
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

    .charge-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      margin-top: 16px;
    }

    .charge-box input {
      padding: 8px 12px;
      font-size: 18px;
      width: 300px;
      text-align: center;
      border: 2px solid var(--blue);
    }

    .charge-box button {
      padding: 10px 20px;
      font-size: 18px;
      cursor: pointer;
      background: var(--blue);
      color: #fff;
      border: none;
      border-radius: 8px;
    }

    .charge-box .back-btn {
      padding: 6px 16px;
      font-size: 16px;
      cursor: pointer;
      background: #cce6ff;
      color: var(--blue-dark);
      border: none;
      border-radius: 6px;
      margin-top: 5px;
    }

    /* マスコットと吹き出し */
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

    /* モーダル */
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: #fff;
      padding: 24px 32px;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .modal-buttons {
      margin-top: 16px;
      display: flex;
      justify-content: space-around;
    }

    .modal-buttons button {
      padding: 8px 20px;
      font-size: 16px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
    }

    #modalYes {
      background: var(--blue);
      color: #fff;
    }

    #modalNo {
      background: #ccc;
      color: #333;
    }
  </style>