import Layout from "../../components/Layout.tsx";

export default function Login(props: { showOptions: boolean }) {
  return (
    <>
      <Layout
        showOptions={props.showOptions}
      >
        <div class="login">
          <h2>Login</h2>

          <div class="contenedor-formulario">
            <form method="post" action="../../api/auth/login">
              <div class="campo">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Email for login"
                  required
                />
              </div>

              <div class="campo">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password for login"
                  required
                />
              </div>

              <input
                type="submit"
                value="Login"
                class="btn btn-verde btn-block"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
