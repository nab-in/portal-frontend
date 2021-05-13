import Template from "../template/Template"
import NewsLetter from "../newsletter/NewsLetter"
import { useAuthState } from "../../context/auth"

const PageTemplate = ({ heading, children }) => {
  const { isAuthenticated } = useAuthState()
  return (
    <div>
      <div className="hero" />
      <main>
        <Template heading={heading}>
          <div
            className={
              isAuthenticated
                ? `template__layout full__width`
                : `template__layout`
            }
          >
            <div className={` main__content`}>{children}</div>
            {!isAuthenticated && (
              <div className={`sub__content newslatter`}>
                <NewsLetter />
              </div>
            )}
          </div>
        </Template>
      </main>
    </div>
  )
}

export default PageTemplate
