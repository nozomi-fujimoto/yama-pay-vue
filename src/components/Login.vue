<template>
  <div class="login-box">
    <h1>やまPay ログイン</h1>
    <input type="text" v-model="username" placeholder="ユーザー名" @keydown.enter="handleLogin">
    <button id="btnLogin" @click="handleLogin">ログイン</button>
    <!-- ハードモード用の透明タップゾーン -->
    <div class="secret-zone" @click="secretTap"></div>
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
        alert("ログインに失敗しました");
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
  font-family: "Hiragino Kaku Gothic ProN", Meiryo, "Noto Sans JP", sans-serif;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--blue-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: var(--font-family);
}

.login-box {
  text-align: center;
  padding: 24px;
  border: 6px solid var(--blue);
  /* 他画面と揃えた枠の太さと色 */
  border-radius: 24px;
  background: #dff5ff;
  /* メイン画面のカード背景と統一 */
  width: 350px;
  box-sizing: border-box;
}

.login-box input {
  margin-bottom: 16px;
}

h1 {
  color: var(--blue-dark);
  /* タイトル色を統一 */
  margin-bottom: 16px;
}

input {
  padding: 8px 12px;
  font-size: 18px;
  margin-bottom: 12px;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid var(--blue);
  border-radius: 8px;
  text-align: center;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  background: var(--blue);
  color: #fff;
  border: none;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
}

/* ハードモード切替ゾーン（右上50px四方） */
.secret-zone {
  position: fixed;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  opacity: 0;
  /* 透明にして見えない */
  z-index: 999;
}
</style>
