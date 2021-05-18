# Portal frontend components details

To start this app run

```bash
npm run dev
# or
yarn dev
```

## Dependencies

`axios` for api calls.
`dotenv` for environment variables.
`moment` for working on time/date.
`react-icons` for different icons.
`react-linkify` this is used to wrap a text/paragraph to detect links and automatically adding anchor tags to those links. It is used in job description.
`sass` this dependency allows using sass directly to react without compiling sass to css.

## Pages

1. `index.js` Landing page, consists of the following components\

   1. `/components/home/hero/Hero.js` displays the introductory header and paragraph along with the search bars that redirects to jobs page.\
   2. `/components/jobs_template/Jobs.js` showcases the jobs for landing page and jobs page. (more explanations on components details)\
   3. `/components/home/companies/Companies.js` contains a list of some available companies and the number of jobs the company have posted.

2. `jobs.js` Displays list of all jobs available. consists of the following components.\

   1. `/components/filter_hero/Hero.js` this is used for both jobs and companies pages to display different filters for searching either jobs or companies.\
   2. `/components/jobs_template/Jobs` showcases jobs and it is used also in landing page expept here it also shows different filter criterias as entered by user in `/components/filter_hero/Hero.js` component.

3. `companies.js` Displays the list of all verified companies available. consists of\

   1. `/components/filter_hero/Hero.js` more descriptions in components part\
   2. `/components/template/Template.js` this returns a general layout for landing, jobs, companies, about, pages and other pages, takes in a heading(primary heading) and childrens(whatever components can be added as a child in its parent component).\
   3. `/components/company/Company.js` the company card for mapped inside the main companies page.\
   4. `/components/loaders/ButtonLoader.js` for displaying spinner while fetching more companies\
   5. `/components/newsletter/NewsLetter.js` for displaying subscribe form

4. `company.js` displays profile of authenticated company i.e. the company that is current logged in and returns 404 not found component when no company is logged in. It consists of

   1. `/components.profile_template/Profile_Template.js` this components uses props to display different profile informations of various users. (more explainations on the component part).
   2. `/components/error/Error.js` this return 404 page error when no company is authenticated.

5. `profile.js` displays profile of authenticated user i.e. the user that is current logged in and returns 404 not found component when no user is logged in. It consists of

   1. `/components.profile_template/Profile_Template.js` this components uses props to display different profile informations of various users. (more explainations on the component part).
   2. `/components/error/Error.js` this return 404 page error when no user is authenticated.

6. `404.js` displays page not found error when user visits a route that is not in the pages list i.e `http://localhost:3000/page-not-listed` will return this page. it consists of

   1. `/components/error/Error.js`

7. `register.js` page for registering users. it consists of

   1. `/components/register/JobSeeker.js` for registering job seekers
   2. `/components/register/Company.js` for registering companies

8. `login.js` for authenticating users

9. `forgot_password` for when users forgets their password

10. `about.js` for displaying about jobportal info. contains

    1. `/components/page_template/Page_Template.js` this contains a hero and a `/components/template/Template.js` for normal pages i.e about, contact, help, terms and conditions etc and childrens for any content in the pages

11. `contact.js` ...refer to about page

12. `companies/'id].js` displays company with id [id] profile details. it employs the same way `company.js` page works but for any company and doesnt require authentication

13. `profile/[id].js` displays user with id [id] profile details, this will only be accessible to an admin of job portal unless when the id is same to authenticated user id then it will display details as in `profile.js` page
