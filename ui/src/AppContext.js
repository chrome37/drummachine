import { Container } from "unstated";
import axios from "axios";

export default class AppContext extends Container {
  constructor() {
    super();
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    this.state = {
      isLoading: false,
      title: "Drum Machine",
      isAuthenticated: isAuthenticated,
      token: token,
      email: email,
      dialog: {
        type: null,
        title: "",
        body: ""
      },

    };
  }

  setTitle(title) {
    this.setState({ title: title });
  }

  setLoading(isLoading) {
    this.setState({ isLoading: isLoading });
  }

  showMessageDialog(title, body, callback) {
    this.dialogCallback = callback;
    this.setState({ dialog: { type: "Message", title: title, body: body } });
  }

  onCloseDialog = result => {
    this.setState({ dialog: { type: null, title: "", body: "" } });
    if (this.dialogCallback) {
      this.dialogCallback(result);
      this.dialogCallback = null;
    }
  };

  async login(data) {
    this.setLoading(true);
    try {
      this.setLoading(true);
      const res = await this.http().post("/api/v1/auth/login", data);
      this.setState({
        token: res.data.token,
        email: res.data.email,
        isAuthenticated: true
      });
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      return res.data;
    } catch (err) {
      this.handleHttpError(err);
    } finally {
      this.setLoading(false);
    }
  }

  logout() {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    this.setState({ token: "", email: "", isAuthenticated: false });
  }

  http() {
    if (this.state.isAuthenticated) {
      const config = {
        baseURL: "http://localhost:5000",
        headers: {
          authorization: `bearer ${this.state.token}`
        }
      };
      return axios.create(config);
    } else {
      return axios.create({ baseURL: "http://localhost:5000" });
    }
  }

  handleHttpError(err) {
    if (!err.response) {
      console.log(err);
      this.showMessageDialog("エラー", "ネットワーク接続が確立されていません");
    } else if (err.response.status === 401) {
      if (!this.state.loginInfo) {
        this.showMessageDialog(
          "エラー",
          "ユーザーIDまたはパスワードが違います"
        );
      } else {
        this.showMessageDialog(
          "エラー",
          "認証の期限が切れているため、再ログインしてください",
          () => this.logout()
        );
      }
    } else {
      this.showMessageDialog(
        "エラー",
        `予期せぬエラーが発生しました\n(${err.message})`
      );
    }
  }
}
