# Portal frontend components details

To start this app run

```bash
npm install
```

And then run

```bash
npm run dev
# or
yarn dev
```

Open `http://localhost:3000` to display it in the browser

## Dependencies

`axios` for api calls.\
`dotenv` for environment variables.\
`moment` for working on time/date.\
`react-icons` for different icons.\
`react-linkify` this is used to wrap a text/paragraph to detect links and automatically adding anchor tags to those links. It is used in job description.\
`sass` this dependency allows using sass directly to react without compiling sass to css.

## Pages

1. `index.js` Landing page, consists of the following components

   1. `/components/home/hero/Hero.js` displays the introductory header and paragraph along with the search bars that redirects to jobs page.
   2. `/components/jobs_template/Jobs.js` showcases the jobs for landing page and jobs page. (more explanations on components details)
   3. `/components/home/companies/Companies.js` contains a list of some available companies and the number of jobs the company have posted.

2. `jobs.js` Displays list of all jobs available. consists of the following components.

   1. `/components/filter_hero/Hero.js` this is used for both jobs and companies pages to display different filters for searching either jobs or companies.
   2. `/components/jobs_template/Jobs` showcases jobs and it is used also in landing page expept here it also shows different filter criterias as entered by user in `/components/filter_hero/Hero.js` component.

3. `companies.js` Displays the list of all verified companies available. consists of

   1. `/components/filter_hero/Hero.js` more descriptions in components part
   2. `/components/template/Template.js` this returns a general layout for landing, jobs, companies, about, pages and other pages, takes in a heading(primary heading) and childrens(whatever components can be added as a child in its parent component).
   3. `/components/company/Company.js` the company card for mapped inside the main companies page.
   4. `/components/loaders/ButtonLoader.js` for displaying spinner while fetching more companies
   5. `/components/newsletter/NewsLetter.js` for displaying subscribe form

4. `company.js` displays profile of authenticated company i.e. the company that is current logged in and returns 404 not found component when no company is logged in. It consists of

   1. `/components/profile_template/Profile_Template.js` this components uses props to display different profile informations of various users. (more explainations on the component part).
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

13. `profile_template` is used to showcase user/companies profiles/ jobs/ applied jobs/ saved jobs/ edit profile items. The profile page has three main sections -> `hero`, `navigation` and `main-content` and uses tabs to switch between different contents/pages. these tabs looks like this `http://localhost:3000/page_name?tab=tab_name` the value of tab ie tab_name is what returns the required contents.... more explanations below.

    1. `/Perofile_Template.js` is the entry component in the whole profile ecosystem. it takes in `/components/profile_template/hero/Hero` to display a hero for some details and `/components/profile_template/template/Template` to display the main profile details and takes two props ie

    ```JS
        {
            details, // profile details of either user or company/ both share some similar components
            page // page name ie page can be user (do indicate the profile is of user), auth-user (to indicate the profile is of authenticated user/ user who is currently logged in) or company (to indicate that the profile is of a company)
        }
    ```

    2. `/hero/Hero.js` displays some user/company details on the hero, takes in `details` and `page` as props
    3. `/template/Template.js` takes in `details` and `page` as props and also its where we check if the profile is of authenticated user or company(in order to allow them to edit profile if its theirs as well as view their own private items like `applied jobs` of `saved jobs`). Two components are imported in this component which is `Aside` (navigation section of the profile) and `Details` (main content of the website), both taking `details` and `page`, `isUser` (true if profile is of the current logged in user) and `isCompany`(true if the profile is of the current logged in company) as props
    4. `/aside/Aside.js` as explained above this shows profile navigation and consist of route like `tab=profile`- for profile details page, `tab=edit-profile` available if `isUser` or `isCompany` is true to allow users to edit their profiles, `tab=jobs` available for companies only and works only when `page="company"`, `/dashboard` this ia available if `isCompany` is true or if `isUser` is true and user is an `admin` to take them to their dashboards which is another apps, `tab=saved-jobs` and `tab=applied-jobs` when `isUser` is true and works only when `page="user/auth-user"`. the aside does not display at all when `isUser` and `isCompany` are false and it is a user profile and only an admin can view user profile
    5. `/Details.js` this works similar to aside where displays different contents deoending on the route clicked in the aside, the authentication status and the page ie, if `isUser` and page is `user`/`auth-user` and the tab=`edit-profile` it will display edit profile contents while if `isUser` is false it will just display the profile details of the user. so it takes in several components ie `/components/profile_template/edit-profile/EditProfile.js`, `/components/profile_template/edit-profile/Profile.js`, `/components/profile_template/edit-profile/Jobs.js`, `/components/profile_template/edit-profile/AppliedJobs.js` and `/components/profile_template/edit-profile/SavedJobs.js` components.
    6. `/Section.js` this is the main template used by details components, takes in heading and children
    7. `/profile/Profile.js` this displays profile information for any user/company, it takes in `details` props.
    8. `/jobs/Jobs.js` displays jobs added by a company. only works when `tab=jobs` and `page=company`
    9. `/jobs/AppliedJobs.js` displays jobs that user has applied and their status and only work when `tab=applied-jobs` and `isUser` is true otherwise returns `/components/profile_template/profile/Profile.js` component
    10. `/jobs/SavedJobs.js` displays jobs user has saved and works similar to the component above
    11. `/edit-profile/EditProfile.js` this works on `tab=edit-profile` and either `isUser` or `isCompany` is true otherwise returns `/components/profile_template/profile/Profile.js` component. also it takes in `details`, `isUser` and `isCompany` props. it has two components, `/components/profile_template/edit-profile/user/EditUser.js` and `/components/profile_template/edit-profile/company/EditCompany.js`. the reason to separate these stuffs is user and company updates their profile to different destinations/ api routes just like we did in register. so if `isUser` is true then displays `EditUser` component and the other way around.
        `NB`: both `isUser` and `isCompany` can never be true at the same time, its either one of them true or both false.
        1. `/user/EditUser.js` edits user and takes in `/edit-profile/Upload.js` to allow user to upload dp/profile photos, `/edit-profile/CV.js` to allow user to upload their CVs, `/settings/Settings.js` to allow users to update their core info like email, username and password while allowing users to update their basic infos inside the same component.
        2. `/company/EditCompany.js` workis exactly like `/user/EditUser` except doesnt have upload CV section and in the settings doesnt have username settings ie companies dont have usernames
        3. `Upload.js` allows uploading dp/logos
        4. `/user/CV.js` allows uploading CVs
        5. `/settings/Settings.js` allow user to update their core info like `username`, `emails` and `password`. updating each of these info reguires user to add his/her current login info to ensure its the user who is doing them changes even if user may be authenticated. this is because we may use unexpiring sessions/tokens and anyone can use users computer so just to make sure. it takes in `Username`, `Email` and `Password` components.
           1. `/Username.js`, `Email.js`, `Password.js` as explained above these contains forms to update the infos and the UI part is the are arranged as accordions where user have to click the title to actually see the form so they require `/Accordion.js` just to do that.
           2. `/Accordion.js` is used to toggle on and off the settings forms this is good to reduce the number of components visible at the same time in the settings part as having three forms at the same time actually can distract user so they must choose what they want to change, click them and boom the form appears before them

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

21. `jobs_template/Jobs.js` this is used in `index.js` and `jobs.js` to display jobs and other items. it accepts props which are

```JS
{
    search,
    setSearch, // refer to `/components/filter_hero/Hero.js`
    heading, //to render different headings as per page
    page // to render different items for different pages ie from jobs page the value passed is page="jobs"
}
```

it uses `/components/template.Template.js` as the main template and pass childrens and heading as props. refer to `/components/template.Template.js`
it maps `/components/job/Job.js` when jobs are available from the main page
it also uses `/components/filter_criteria` to display different criterias in the `/pages/jobs.js` page

22. `filter_criteria` used to display different filter criterias in `/pages/jobs.js` and `/pages/companies.js` pages

    1. `/FilterCriteria.js` this accepts search and setSearch props. setsearch is used to remove item/criteria from the state and search to display criteria in the browser. it displays `keyword` and `location` criteria while maps categories to display category names. in each category it maps the `/components/filter_criteria/FilterItem.js` to displays subcategories of each category. if none exists or have no value in search state it doesnt display nothing
    2. `/FilterItem.js` it is mapped in the above component to display subcategories of each category with a function to remove the subcategory. if removed it update search state using setsearch and if all the subcategories are removed from a category it removes the category completely from the search state

23. `footer`

## CSS

Most of the components are wrapped in the folders and contains their own css files. These files have `.module.sass` extension. the global css files are placed in `/styles` folder and are

    1. `/global.sass`, this is the global css file and is imported in `/pages/_app.js`. contains all the global styles together with some components which starts with `_filename.sass`
    2. `_filename.sass` these are components in sass ecosystem and can be imported in any sass file in order to use their styles/ varialbles or functions
