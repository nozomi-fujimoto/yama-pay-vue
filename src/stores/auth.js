import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: null,
    balance: null,
    error: null,
    loading: false,
  }),

  actions: {
    async login(username) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get(`https://yamapay.seafood-avocado.com/api/wallets/${username}/balance`);

        // 成功時
        this.userId = res.data.userId
        this.balance = res.data.balance
        return true
      } catch (err) {
        this.error = err.response?.data?.detail || 'ログインに失敗しました'
        return false
      } finally {
        this.loading = false
      }
    },
    async charge(username, amount, description) {
      try {
        const data = { amount: amount, description: description }
        const res = await axios.post(`https://yamapay.seafood-avocado.com/api/wallets/${username}/charge`, data);

        // 成功時
        this.balance = res.data.balanceAfter
        return true
      } catch (err) {
        this.error = err.response?.data?.detail || 'チャージに失敗しました'
        return false
      } finally {
        this.loading = false
      }
    }
  },

  persist: true, // ログイン状態を維持したい場合
})
