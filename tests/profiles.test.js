import { render, screen } from "@testing-library/react"
import App from "../pages/profile"

// jest.mock("next/config", () => () => ({
//   publicRuntimeConfig: {
//     API_URL: "http://localhost:5000/api",
//     DASH_URL: "http://localhost:3005",
//     BACKEND_URL: "http://localhost:5000",
//   },
// }))

// jest.mock("swiper/react", () => () => ({}))

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />)
    expect(
      screen.getByRole("heading", { name: "Welcome to Next.js!" })
    ).toBeInTheDocument()
  })
})
