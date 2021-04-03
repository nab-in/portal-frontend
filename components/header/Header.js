import Link from "next/link"
import { AiOutlineSearch } from "react-icons/ai"

const Header = () => {
  return (
    <header>
      <div className="container">
        <h1>
          <Link href="/">Logo</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link href="/jobs">Jobs</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <AiOutlineSearch className="icon" />
            </li>
          </ul>
        </nav>
        <nav>
          <Link href="/login">Login</Link>
          <Link href="/register" className="btn btn-primary">
            Join Us
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
