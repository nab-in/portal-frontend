# Portal frontend components details

To start this app run

```bash
npm run dev
# or
yarn dev
```

## Dependencies

`axios` for api calls.\
`dotenv` for environment variables.\
`moment` for working on time/date.\
`react-icons` for different icons.\
`react-linkify` this is used to wrap a text/paragraph to detect links and automatically adding anchor tags to those links. It is used in job description.\
`sass` this dependency allows using sass directly to react without compiling sass to css.

## Pages

1. `index.js` Landing page, consists of the following components

   1. `/components/home/hero/Hero.js` displays the introductory header and paragraph along with the search bars that redirects to jobs page.\
   2. `/components/jobs_template/Jobs.js` showcases the jobs for landing page and jobs page. (more explanations on components details)\
   3. `/components/home/companies/Companies.js` contains a list of some available companies and the number of jobs the company have posted.

2. `jobs.js` Displays list of all jobs available. consists of the following components.

   1. `/components/filter_hero/Hero.js` this is used for both jobs and companies pages to display different filters for searching either jobs or companies.\
   2. `/components/jobs_template/Jobs` showcases jobs and it is used also in landing page expept here it also shows different filter criterias as entered by user in `/components/filter_hero/Hero.js` component.

3. `companies.js` Displays the list of all verified companies available. consists of

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

## context

1. `auth.js` deals with all the global state management for authenticated user, when the login, update profile, logout etc.
2. `alerts.js` deals with global state managements for alerts when user successfully signed in, logged in, uploaded profile, etc

## data

These are hardcoded data that were userd accross the app as a placeholders to the data coming from the api

## components

1. `alerts/GlobalAlert.js` this is an alerts getting its data from alert context and will be displayed at the bottom center (fixed) of the page when a message to the alert is added/dispatched. it was imported in `pages/_app.js`

2. `buttons/FormButton.js` this is a button that can be used in forms and it accepts several props ie

```JS
    {
        loading, //checks if its loading to display a spinner
        text, //button text
        btnClass, //either btn-primary or btn-secondary NB: any class passed as props need to be styles in global sass file
        btnGroupClass
    }
```

3. `inputs/Input.js` this is an input that can be used in forms as input and accepts several props i.e

```JS
{
    inputClass, // classname incase different stylings are required NB: any class passed as props need to be styles in global sass file
    name, // name of the form. it is Required
    id, // id for the htmlFor in the label
    type, // type of the input ie can be text, email etc
    placeholder, // input placeholder
    value, // value of the input
    handleChange, // handling onchange event of an input. it is Required
    title, // title to display in the label of an input
    error, // for displaying errors underneath an input (it changes the border color and add an error message at the bottom of the input if there is an error)
    success, // does the same as an error just it is for success so the success colors all the way
    textarea, // if true means the input is textarea and returns a textarea
}
```

4. `rippleEffect.js` well a ripple effect for buttons (wave like effect when a button is clicked)

5. `UseClickOutside.js` custom hook for detecting if user has clicked outside an elements, it is used mostly for dropdowns

6. `Logo.js` custom logo image and accepts height of an image props. can be used whenever logo is needed

7. `error/Error.js` as explained in some pages it returns a page not found error with some good UI and call of actions when user wants to go back or go home

8. `loaders` different loaders to display when something's loading, ie some pre-rendered cards loader when jobs/ companies is are being fetched

   1. `/AuthLoader.js` displays some pre-rendered components ie header, hero and template when user data are being fetched when user visits the page... this is to avoid sudden change of some components when user is loaded and authenticated
   2. `/ButtonLoader.js` displays spinner in the button when user is has clicked some buttons that requires fetching to alert user that its fetching. it is alse used for loading more jobs and companies and/or can be used anywhere where a spinner is required. it accepts props

   ```JS
    {
        bg, // if bg="light" it means the spinner is in light background and changes the class which eventually changes the color of the spinner. default a spinner works on colored background/it is white
    }
   ```

   3. `/CardLoader.js` this prerenders cards when components that requires cards are loading. these components are Job card, company card. it accepts a prop

   ```JS
    {
        stars, // true or false it means displays stars loading or not the reason is the company card does not have stars and hence stars can be false while the job card has stars and hence will pass stars={true} as a prop
    }
   ```

   4. `/CpmpaniesLoader.js` in the landing page at the companies section this loader is user to prerender when fetching companies
   5. `/Details.js` renders when job details are loading and is used in `/pages/jobs/[id].js`
   6. `/HeroLoader.js` prerenders hero component for profile(both companies and user profiles) pages and job details page when details are fetching
   7. `/ProfileLoader.js` renders when user details are fetching and is used in main profile part of the profile(more explanations in `/components/profile_template` part)

9. `newsletter/NewsLetter.js` displays subscription form for unauthenticated users

10. `template/Template.js` is used for many pages to display main section of the page and also contains primary header and is responsible for the layout (ie in the page where jobs part and newsletter/related jobs part is displayed )

11. `page_template/PageTemplate.js` is the component that uses `/components/template/Template.js` component but also has its own hero fro the pages where hero doesn't have any content i.e about, contact etc

12. `register` contains two components to separate registering user/jobseeker and registering a company
    1. `/JobSeeker.js` responsible for registering normal user/Job seeker
    2. `/Company.js` responsible for registering a company
13. `profile_template`
14. `job` random jobs components used accross the app

    1. `/Job.js` a job card to display some job details and is used in `/components/jobs_template/Jobs.js` which is used in both `/pages/index.js` and `/pages/jobs.js`. It accepts props ie

       ```JS
           {
               job: {
                   id,
                   title,
                   company,
                   created_at,
                   close_date,
                   close_time,
                   job_type,
                   location,
                   reviews,
               }
           }
       ```

       2. `/JobDetails.js` display job details in the `/pages/jobs/[id].js` page. it accepts props ie

       ```JS
       {
           job: {
               id, job_type, location, company, email, attachment, descriptions
           }
       }
       ```

       3. `/RelatedJobs.js` in `/pages/jobs/[id].js` it displays three jobs which relates to the job with id [id]

15. `company/Company` is a company card mapped in `/pages/companies.js` and accepts props ie

```JS
{
    id, logo, name, jobs // number of jobs added by the individual company
}
```

16. `layout/Layout.js` it is the main layout for all pages expect `/pages/login.js`, `/pages/register.js` and `/pages/forgot_password.js`. it is used to display `/components/header/Header.js` at the top, `/components/footer/Footer.js` at the bottom and whatever component props is passed in as children.
    it is imported in `/pages/_app.js` and its where user data will be fetched hence `/components/loaders/AuthLoader.js` will pre-render while fetchimg user data. This is to avoid fetching user data to the pages where this layout isn't users ie `login.js`

17. `header`

    1. `/Header.js` is the main header of the app and is imported in `/components/layout/Layout.js`. it displays the main navigation as well as some user data when user is authenticated
    2. `/Profile.js` displays saome basic user data and some navigation to authenticated pages, shows when user is authenticated
    3. `/Notifications.js` display user notifications and only showa when user is authenticated

18. `home` contains components that are used in landing page only

    1. `/hero/Hero.js` contains introductory heading and paragraph together with search bars which redirects to jobs page.
    2. `/companies/Companies.js` dispays a shortlist of companies in the landing page

19. `filter_hero/Hero.js` this is used for both `/pages/companies.js` and `/pages/jobs` to display different search criteria. it has search inputs as well as mapping category filters `/components/categories/Category.js`. it accepts accept props which is `search` and `setSearch`. search is a state declared in the individual page such as jobs page and setSearch is also a method declared in usestate to update search state. When user type in search bars it updates the state in this same component.

The reason to opt usestate instead of using global state is because these same components are used to update different states ie search state in jobs is different from that in companies page and they are used to call different data in the api although they share the same types of data ie search passed as props is declared as

```JS
    {
        keyword: "",
        location: "",
        categories: [],
    }
```

20. `categories` used to display different filters in `/components/filter_hero/Hero.js` component

    1. `/Category.js` this component is mapped in `/components/filter_hero/Hero.js` and takes in the props ie search, setSearch (...refer to `/components/filter_hero/Hero.js` component), category which has the following data

    ```JS
        {
            name, //category name
            sub_categories: [], // array of subcategories
            id, //category id
        }
    ```

    these data are extracted from `/components/filter_hero/Hero.js` component where in that component categories are fetched from the api, the sub_category array is mapped in this component

    2. `/SubCategory.js` is mapped from `/components/categories/Category` and is used to display subcategories of the main category. it receives props such as

    ```JS
        {
            sub: {
                id, //sub_category id
                name, //sub_category name
            },
            setSearch, // prop drilled from the main page
            search, // prop drilled from main page
            category: {
                id, //parent category id
            }
        }
    ```

    In this component user is allowed to select/unselect any subcategory and the clicked subcategory is then added/removed in the search state, the main reason we have setSearch. search prop is used to update UI when user selects and unselect a sub_category by using custom checkbox(svg)

21. `jobs_templateJobs.js`

22. `filter_criteria`

23. `footer`
