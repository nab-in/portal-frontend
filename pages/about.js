import Template from "../components/template/Template"
import NewsLetter from "../components/newsletter/NewsLetter"
import { useAuthState } from "../context/auth"
import styles from "../styles/page.module.sass"

const about = () => {
  const { isAuthenticated } = useAuthState()
  return (
    <div className={styles.page}>
      <div className="hero" />
      <main>
        <Template heading="About Us">
          <div
            className={
              isAuthenticated
                ? `template__layout full__width`
                : `template__layout`
            }
          >
            <div className={` main__content`}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Imperdiet imperdiet nunc vitae eu neque. Lobortis aliquet cursus
                sem accumsan. Sit pulvinar eget leo sagittis. Euismod nulla in
                tellus adipiscing. Phasellus nulla id lacus, accumsan sit elit
                placerat. Odio nec risus ut pellentesque risus, erat tempor,
                massa quis. Vel ligula etiam lectus euismod placerat. Mauris
                luctus hac egestas et. Orci sodales tortor nam pellentesque sed
                eget cursus blandit aliquam. Molestie rhoncus molestie in nisi
                eget risus, viverra eget. Tortor diam, lacus, tincidunt
                ridiculus congue a quisque. Nunc ac dapibus ut tortor amet.
              </p>
              <p>
                Turpis eget lorem posuere vestibulum dis vulputate. Dictumst
                maecenas pellentesque lobortis nisl neque. Mi pretium semper
                tincidunt amet aliquam suspendisse. Amet vitae diam mi, ut sem
                cras. Vitae massa velit fames imperdiet mattis sed. Est et leo
                nisl, maecenas proin urna, vitae elit sit. Ornare felis rhoncus
                fames sed. Enim magna a nec neque, suscipit. Ultrices non
                tempus, curabitur elementum viverra neque, turpis. Ac augue duis
                magna egestas pharetra. Pulvinar morbi a ullamcorper massa, vel
                vitae ipsum aliquam interdum. Nec imperdiet ultrices id proin
                mattis lorem platea. Est nec leo vulputate tincidunt luctus in.
                Massa pharetra auctor integer pulvinar senectus egestas enim.
                Turpis dictum at dictum nam sed sed accumsan. Tellus fames
                gravida integer bibendum eget nascetur id. At aliquam a donec
                eu. At velit quam quam ut blandit justo est
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Imperdiet imperdiet nunc vitae eu neque. Lobortis aliquet cursus
                sem accumsan. Sit pulvinar eget leo sagittis. Euismod nulla in
                tellus adipiscing. Phasellus nulla id lacus, accumsan sit elit
                placerat. Odio nec risus ut pellentesque risus, erat tempor,
                massa quis. Vel ligula etiam lectus euismod placerat. Mauris
                luctus hac egestas et. Orci sodales tortor nam pellentesque sed
                eget cursus blandit aliquam. Molestie rhoncus molestie in nisi
                eget risus, viverra eget. Tortor diam, lacus, tincidunt
                ridiculus congue a quisque. Nunc ac dapibus ut tortor amet.
              </p>
              <p>
                Turpis eget lorem posuere vestibulum dis vulputate. Dictumst
                maecenas pellentesque lobortis nisl neque. Mi pretium semper
                tincidunt amet aliquam suspendisse. Amet vitae diam mi, ut sem
                cras. Vitae massa velit fames imperdiet mattis sed. Est et leo
                nisl, maecenas proin urna, vitae elit sit. Ornare felis rhoncus
                fames sed. Enim magna a nec neque, suscipit. Ultrices non
                tempus, curabitur elementum viverra neque, turpis. Ac augue duis
                magna egestas pharetra. Pulvinar morbi a ullamcorper massa, vel
                vitae ipsum aliquam interdum. Nec imperdiet ultrices id proin
                mattis lorem platea. Est nec leo vulputate tincidunt luctus in.
                Massa pharetra auctor integer pulvinar senectus egestas enim.
                Turpis dictum at dictum nam sed sed accumsan. Tellus fames
                gravida integer bibendum eget nascetur id. At aliquam a donec
                eu. At velit quam quam ut blandit justo est
              </p>
            </div>
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

export default about
