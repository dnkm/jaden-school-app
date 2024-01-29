export default async function Nav() {
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Tutor App</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Link</a>
          </li>
          <li>
            <details>
              <summary>Profile</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>
                  <form action="/auth/signout" method="post">
                    <button className="button block" type="submit">
                      Sign out
                    </button>
                  </form>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
