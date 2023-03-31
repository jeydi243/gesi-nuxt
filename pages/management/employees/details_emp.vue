<template>
  <div>
    <div class="card relative mb-5">
      <div class="row justify-between sticky top-0">
        <div class="flex border-b border-gray-200 mb-2 select-none">
          <template v-for="(tab, indexTab) in tabsEmp" :key="indexTab">
            <a class="btn-tab2 align-middle items-center row" :class="{ 'btn-tab-active2': tab.current }" @click="changeTab(indexTab)">
              {{ filters.firstUpper(tab.name) }}
              <box-icon v-if="indexTab != 0" name="lock-alt" type="regular" :color="!tab.current ? 'gray' : 'blue'" size="sm" class="self-center text-center"></box-icon>
            </a>
          </template>
        </div>
        <div class="row h-9">
          <button class="btn-unstate mr-2" @click="refresh">Refresh</button>
          <div>
            <div class="flex justify-center">
              <div class="dropdown relative">
                <button class="btn-unstate-min dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  <box-icon name="dots-vertical-rounded" color="green" class="bg-red cursor-pointer"></box-icon>
                </button>
                <ul class="dropdown-menu min-w-max absolute bg-white text-base z-50 float-left list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none" aria-labelledby="dropdownMenuButton1">
                  <li @click="edit_mode = !edit_mode">
                    <a class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100" href="#">Update</a>
                  </li>
                  <li @click="showModalDeleteEmployee = true">
                    <a class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-red-500 hover:bg-red-100" href="#">Delete</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fadeSlideX" mode="out-in">
      <div class="" v-if="currentTab == 'basic information'">
        <div class="card row mt-4 min-h-[200px] relative w-full">
          <div class="row relative transition-all duration-700 w-full">
            <div class="flex-none relative h-[150px] w-[150px] mr-3 items-center align-middle">
              <div class="row items-center my-auto h-full">
                <div class="backdrop-blur-sm bg-red-white/30 absolute left-[25%] top-[35%] z-10 w-20 h-7 rounded-md text-white text-center cursor-pointer" v-if="edit_mode"><button type="button" @click="changepicture">Edit</button></div>
                <!-- <img src="http://localhost:3000/resources/file/63bf2dda6afe67abeb28c994" class="rounded-lg h-[150px] w-[150px] select-none relative top-0 left-0 z-0" :class="{ 'border-2 border-dashed p-2': edit_mode }" /> -->
                <img :src="api_resources.getById(userData?.profile_image)" class="rounded-lg h-[150px] w-[150px] select-none relative top-0 left-0 z-0" :class="{ 'border-2 border-dashed p-2': edit_mode }" />
              </div>
            </div>
            <div v-if="!edit_mode" class="flex-none">
              <div class="col ml-5 space-y-2">
                <span class="capitalize font-bold text-xl">{{ userData.last_name }}</span>
                <span class="font-bold text-green-600">{{ userData.position[0] }}</span>
                <span class="italic text-sm">{{ userData.email }}</span>
                <span class="italic text-sm">{{ userData.telephones[0] }}</span>
                <span class="bg-green-100 pl-1 pt-1 pb-1 pr-3 rounded-md font-bold" data-bs-toggle="tooltip" data-bs-placement="right" :title="userData.hire_date">7 years of experience</span>
              </div>
            </div>
            <div v-else class="w-auto grow">
              <Form class="w-full" @submit="updateBasic" v-slot="{ isSubmitting }" :validation-schema="basicInfoSchema" :initial-values="basicInfo" @invalid-submit="onInvalidBasicInfo">
                <div class="row space-x-2">
                  <div>
                    <Field name="first_name" class="w-full g-input-text"></Field>
                    <ErrorMessage name="first_name" v-slot="{ message }">
                      <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                  </div>
                  <div>
                    <Field name="last_name" class="w-full g-input-text"></Field>
                    <ErrorMessage name="last_name" v-slot="{ message }">
                      <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                  </div>
                  <div>
                    <Field name="middle_name" class="w-full g-input-text"></Field>
                    <ErrorMessage name="middle_name" v-slot="{ message }">
                      <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                  </div>
                </div>
                <div>
                  <Field name="email" class="w-full g-input-text"></Field>
                  <ErrorMessage name="email" v-slot="{ message }">
                    <p class="input-error">{{ message }}</p>
                  </ErrorMessage>
                </div>
                <div>
                  <Field name="position" class="w-full g-input-text"></Field>
                  <ErrorMessage name="position" v-slot="{ message }">
                    <p class="input-error">{{ message }}</p>
                  </ErrorMessage>
                </div>
                <div>
                  <Field name="telephones" class="w-full g-input-text"></Field>
                  <ErrorMessage name="telephones" v-slot="{ message }">
                    <p class="input-error">{{ message }}</p>
                  </ErrorMessage>
                </div>
                <div class="flex flex-row h-1/2 w-full items-center justify-between">
                  <button class="btn-unstate" @click.prevent.stop="closeModal">Cancel</button>
                  <button type="submit" class="btn-primary">
                    <span class="font-bold text-white" v-if="!isSubmitting">Update</span>
                    <CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div class="card mt-4 min-h-[200px] relative">
          <span class="font-bold text-xl">Documents</span>
          <div class="row w-full justify-evenly space-x-6 a my-auto">
            <div class="col justify-items-end" v-for="(doc, index) in docs" :key="index">
              <div class="row bg-clip-border justify-between min-w-[300px] items-center bg-green-50 h-9 rounded-md pl-2 border-dashed border-2 border-green-300 text-green-900 self-center">
                <span class="capitalize font-bold">{{ doc.name }}</span>
                <div class="row">
                  <a :download="doc.link" class="bg-green-900 text-white h-8 border-2 rounded-md rounded-br-md cursor-pointer text-center" data-mdb-ripple="true" data-mdb-ripple-color="light">
                    <span class="px-3 cursor-pointer">Voir</span>
                  </a>
                  <a :download="doc.link" class="bg-green-900 h-8 w-8 border-2 rounded-md rounded-br-md cursor-pointer text-center" data-mdb-ripple="true" data-mdb-ripple-color="light">
                    <box-icon type="regular" name="down-arrow-alt" color="white"></box-icon>
                  </a>
                </div>
              </div>
              <div class="row">
                <a v-if="edit_mode" @click="showModalUpdateDoc = !showModalUpdateDoc" class="text-xs italic text-blue-700 cursor-pointer font-bold">Modifier</a>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-center space-x-2 relative mt-4">
          <div class="card min-h-[200px] w-1/2 col justify-between">
            <div v-if="!edit_mode" class="col">
              <span class="font-bold text-xl">Biography</span>
              <span> {{ userData.biography }} </span>
            </div>
            <Form v-else class="col justify-between h-full" @submit="updateBiography" v-slot="{ isSubmitting }" :initial-values="{ biography: userData.biography }" @invalid-submit="invalidBio">
              <div>
                <Field name="biography" as="textarea" placeholder="Biography" class="form-input mb-2 w-full"></Field>
                <ErrorMessage name="biography" v-slot="{ message }">
                  <p class="input-error">{{ message }}</p>
                </ErrorMessage>
              </div>
              <div class="row h-1/2 w-full items-center justify-end">
                <!-- <button class="btn-unstate" @click.prevent.stop="closeModal">Cancel</button> -->
                <button type="submit" class="btn-primary">
                  <span class="font-bold text-white" v-if="!isSubmitting">Update</span>
                  <CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
                </button>
              </div>
            </Form>
          </div>
          <div class="card min-h-[200px] w-1/2 col justify-between">
            <span class="font-bold text-xl">Emergency Contact</span>
            <span v-for="(contact, index) in userData.emergencyContacts" :key="index" class="mt-2 relative transition-all ease-in duration-700" :class="{ 'rounded-lg border-2 px-7': edit_mode }">
              <div class="row justify-between">
                <span>Name: </span>
                <span>{{ contact.name }}</span>
              </div>
              <div class="row justify-between">
                <span>Relationship: </span>
                <span>{{ contact.relationship }}</span>
              </div>
              <div class="row justify-between">
                <span>Telephone: </span>
                <span>{{ contact.telephone }}</span>
              </div>
              <hr class="mb-2 text-green-500" v-if="!edit_mode" />
              <button v-if="edit_mode" @click="deleteContact(contact.id)" class="absolute inline-block bottom-0 right-0 text-center items-center row bg-red-100 rounded-tl-md rounded-br-sm" data-mdb-ripple="true" data-mdb-ripple-color="danger">
                <box-icon type="regular" name="trash" color="red" size="sm" class="text-green-900"></box-icon>
              </button>
            </span>
            <button @click="showModalAddContact = true" class="btn-unstate" v-if="edit_mode" data-mdb-ripple="true" data-mdb-ripple-color="success">Add</button>
          </div>
        </div>
        <div class="col card mt-4 min-h-[200px] relative transition-all ease-in duration-700 justify-between">
          <div>
            <span class="font-bold text-xl">Education & Certifiactions</span>
          </div>
          <ol class="border-l md:border-l-0 md:border-t border-gray-300 md:flex md:justify-start row md:gap-6 mt-2 transition-all ease-in duration-700" :class="{ 'border-none': edit_mode, 'md:justify-start': userData.educations.length == 1 }">
            <li v-for="({ name, start, description, end, from_school, id }, index) in userData.educations" :key="index" class="transition-all ease-in duration-700 relative" :class="{ 'border-2 border-dashed rounded-lg pl-5': edit_mode }">
              <div class="flex md:block flex-start items-center pt-2 md:pt-0">
                <div class="bg-green-300 w-2 h-2 rounded-full -ml-1 md:ml-0 mr-3 md:mr-0 md:-mt-1"></div>
                <p class="text-green-500 text-sm mt-2">{{ filters.toiso(start) }} - {{ filters.toiso(end) }}</p>
              </div>
              <div class="mt-0.5 ml-4 md:ml-0 pb-5">
                <h4 class="text-green-800 font-semibold text-xl mb-1.5">{{ name }}</h4>
                {{ from_school }}
                <p class="text-gray-500 mb-3">{{ description }}</p>
                <button v-if="edit_mode" data-mdb-ripple="true" data-mdb-ripple-color="success" type="button" class="btn-unstate-min w-[80px]" @click="launchUpdateEducation(id)">Update</button>
              </div>
              <button v-if="edit_mode" @click="deleteEducation(id)" class="absolute inline-block bottom-0 right-0 text-center items-center row bg-red-100 rounded-tl-md rounded-br-sm" data-mdb-ripple="true" data-mdb-ripple-color="danger">
                <box-icon type="regular" name="trash" color="red" size="sm" class="text-green-900"></box-icon>
              </button>
            </li>
          </ol>
          <button v-if="edit_mode" class="btn-unstate w-1/3 self-center mt-4" data-mdb-ripple="true" data-mdb-ripple-color="success" @click="showModalAddEducation = true">Add Education</button>
        </div>
        <div class="col card mt-4 min-h-[200px] relative justify-between">
          <div>
            <span class="font-bold text-xl">Work Experiences</span>
          </div>
          <!-- <ol class="border-l md:border-l-0 md:border-t border-gray-300 md:flex md:justify-start md:gap-6 mt-2" :class="{ 'border-none': edit_mode, 'md:justify-start': userData.experiences.length == 1 }">
				<li v-for="({ position, start, end, company, id }, index) in userData.experiences" :key="index" class="relative" :class="{ 'border-2 border-dashed rounded-lg pl-5': edit_mode, 'justify-center': userData.experiences.length == 0 }">
					<div class="flex md:block flex-start items-center pt-2 md:pt-0">
						<div class="bg-green-300 w-2 h-2 rounded-full -ml-1 md:ml-0 mr-3 md:mr-0 md:-mt-1"></div>
						<p class="text-green-500 text-sm mt-2">{{ filters.toiso(start) }} - {{ filters.toiso(end) }}</p>
					</div>
					<div class="mt-0.5 ml-4 md:ml-0 pb-5">
						<h4 class="text-green-800 font-semibold text-xl mb-1.5">{{ position }}</h4>
						At {{ company }}
						<p class="text-gray-500 mb-3">Et elementum lorem ornare. Maecenas placerat facilisis mollis.</p>
						<button v-if="edit_mode" data-mdb-ripple="true" data-mdb-ripple-color="success" type="button" class="btn-unstate-min w-[80px]" @click="launchUpdateExperience(id)">Update</button>
					</div>
					<button v-if="edit_mode" @click="deleteExperience(id)" class="absolute inline-block bottom-0 right-0 text-center items-center row bg-red-100 rounded-tl-md rounded-br-sm" data-mdb-ripple="true" data-mdb-ripple-color="danger">
						<box-icon type="regular" name="trash" color="red" size="sm" class="text-green-900"></box-icon>
					</button>
				</li>
			</ol> -->
          <button v-if="edit_mode" class="btn-unstate w-1/3 self-center mt-4" data-mdb-ripple="true" data-mdb-ripple-color="success" @click="showModalAddExper = true">Add Experience</button>
        </div>
        <div class="col card mt-4 min-h-[200px] relative justify-between">
          <!-- <button class="absolute inline-block top-0 right-0 text-center items-center row bg-green-100 rounded-bl-md rounded-tr-sm" data-mdb-ripple="true" data-mdb-ripple-color="success">
				<box-icon type="regular" name="pencil" color="green" size="sm" class="text-green-900"></box-icon>
			</button> -->
          <span class="font-bold text-xl mb-4">Onboarding</span>
          <article class="row justify-between">
            <div class="col space-y-2" v-if="!edit_mode">
              <div class="form-check form-switch" v-for="(value, key) in userData.onboarding" :key="key">
                <!-- {{ value }} -->
                <input class="toggle" type="checkbox" role="switch" id="work_tools" :disabled="!edit_mode" :checked="value['state']" />
                <label class="form-check-label inline-block text-gray-800" for="work_tools">{{ value["description"] }}</label>
              </div>
            </div>
            <div v-else>
              <Form @submit="updateOnboarding" v-slot="{ isSubmitting, values }" :initial-values="{ ...onboardings }">
                <div class="form-check form-switch" v-for="(val, key) in onboardings" :key="key">
                  <input class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="values[key]" />
                  <label :for="key" class="form-check-label">{{ userData.onboarding.find((e) => e["field"] == key)["description"] }}</label>

                  <ErrorMessage :name="key" v-slot="{ message }">
                    <p class="input-error">{{ message }}</p>
                  </ErrorMessage>
                </div>
                {{ values }}
                <div class="flex flex-row h-1/2 w-full items-center justify-between">
                  <button class="btn-unstate" @click.prevent.stop="closeModal">Cancel</button>
                  <button type="submit" class="btn-primary">
                    <span class="font-bold text-white" v-if="!isSubmitting">Update</span>
                    <CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
                  </button>
                </div>
              </Form>
            </div>
          </article>
        </div>
      </div>
      <div class="r" v-else-if="currentTab == 'account and settings'">
        <div class="card col">
          <span class="text-2xl font-bold">Account and Login</span>
          <div class="password">
            <Form @submit="updatePassword" class="col" v-slot="{ isSubmitting }" :validation-schema="passwordSchema" :initial-values="passwordValue" @invalid-submit="onInvalidPassword">
              <div class="row space-x-1">
                <div class="w-full">
                  <label for="password_verif">Password</label>
                  <Field name="password" type="password" placeholder="Password" class="form-input mb-2 w-full"></Field>
                  <ErrorMessage name="password" v-slot="{ message }">
                    <p class="input-error">{{ message }}</p>
                  </ErrorMessage>
                </div>
                <div class="w-full">
                  <label for="password_verif">Password verification</label>
                  <Field name="password_verif" id="password_verif" type="password" placeholder="Password verification" class="form-input mb-2 w-full"></Field>
                  <ErrorMessage name="password_verif" v-slot="{ message }">
                    <p class="input-error">{{ message }}</p>
                  </ErrorMessage>
                </div>
              </div>
              <div class="row w-full items-center justify-between">
                <button class="btn-unstate" @click.prevent.stop="closeModal">Cancel</button>
                <button type="submit" class="btn-primary">
                  <span class="font-bold text-white" v-if="!isSubmitting">Update password</span>
                  <CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </transition>
    <!-- <form class="mt-12" action="" method="POST">
			<div class="relative">
				<input id="email" name="email" type="text" class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="john@doe.com" />
				<label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email address</label>
			</div>
			<div class="mt-10 relative">
				<input id="password" type="password" name="password" class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="Password" />
				<label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
			</div>

			<input type="sumbit" value="Sign in" class="mt-20 px-4 py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer" />
		</form> -->
    <MyModal v-show="showModalUpdateDoc" @close="showModalUpdateDoc = false">
      <template #header>
        <h1 class="text-4xl">Change Document</h1>
      </template>

      <Form class="flex flex-col justify-between w-full mt-2" @submit="changeDocument" v-slot="{ isSubmitting }" :validation-schema="docSchema" @invalid-submit="invalidFile">
        <!-- <div class="mb-3 w-96">
						<input class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" />
					</div> -->
        <Field v-slot="{ handleChange, handleBlur }" name="myfile" class="w-full">
          <input type="file" @change="handleChange" accept=".pdf" @blur="handleBlur" class="w-full form-file" />
        </Field>
        <ErrorMessage name="myfile" v-slot="{ message }">
          <p class="input-error">{{ message }}</p>
        </ErrorMessage>
        <div class="flex flex-row h-1/2 w-full items-center justify-between mt-5">
          <button class="btn-unstate" @click.prevent.stop="closeModal">Cancel</button>
          <button type="submit" class="btn-primary">
            <span class="font-bold text-white" v-if="!isSubmitting">Add</span>
            <CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
          </button>
        </div>
      </Form>
    </MyModal>
    <MyModal v-show="showModalAddEducation" @close="showModalAddEducation = false">
      <template #header>
        <h1 class="text-4xl">Add Education</h1>
      </template>
      <Form class="flex flex-col justify-between" @submit="addEducation" v-slot="{ isSubmitting }" :validation-schema="educationSchema" :initial-values="educationValue" @invalid-submit="onInvalidEducation">
        <div class="flex sm:flex-col md:flex-row md:justify-between">
          <div class="w-full">
            <Field name="name" placeholder="Name of education" class="form-input mb-2 w-full"></Field>
            <ErrorMessage name="name" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
          </div>
        </div>
        <div class="">
          <Field name="from_school" placeholder="School from" class="form-input mb-2 w-full"></Field>
          <ErrorMessage name="from_school" v-slot="{ message }">
            <p class="input-error">{{ message }}</p>
          </ErrorMessage>
        </div>
        <div class="">
          <Field name="start" type="date" placeholder="Start date" class="form-input mb-2 w-full"></Field>
          <ErrorMessage name="start" v-slot="{ message }">
            <p class="input-error">{{ message }}</p>
          </ErrorMessage>
        </div>
        <div class="">
          <Field name="end" type="date" placeholder="End date" class="form-input mb-2 w-full"></Field>
          <ErrorMessage name="end" v-slot="{ message }">
            <p class="input-error">{{ message }}</p>
          </ErrorMessage>
        </div>
        <Field name="description" as="textarea" placeholder="Describe your experience in this field of education" class="form-textarea mb-4"></Field>
        <ErrorMessage name="description" v-slot="{ message }">
          <p class="input-error">{{ message }}</p>
        </ErrorMessage>
        <span class="text-red-700 text-base">{{ error }}</span>

        <div class="flex flex-row h-1/2 w-full items-center justify-between">
          <button class="btn-unstate" @click.prevent.stop="closeModal">Cancel</button>
          <button type="submit" class="btn-primary">
            <span class="font-bold text-white row" v-if="!isSubmitting"><box-icon type="regular" name="plus" color="white" size="sm"></box-icon>Add</span>
            <CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
          </button>
        </div>
      </Form>
    </MyModal>
    <MyModal v-show="showModalAddContact" @close="showModalAddContact = false">
      <template #header>
        <h1 class="text-4xl">Add Contact</h1>
      </template>
      <Form class="flex flex-col justify-between" @submit="addContact" v-slot="{ isSubmitting }" :validation-schema="contactSchema" :initial-values="contactValue" @invalid-submit="onInvalidContact">
        <div class="flex sm:flex-col md:flex-row md:justify-between">
          <div class="w-full">
            <Field name="name" placeholder="Name of contact" class="form-input mb-2 w-full"></Field>
            <ErrorMessage name="name" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
          </div>
        </div>
        <div class="">
          <Field name="email" placeholder="School from" class="form-input mb-2 w-full"></Field>
          <ErrorMessage name="email" v-slot="{ message }">
            <p class="input-error">{{ message }}</p>
          </ErrorMessage>
        </div>
        <Field placeholder="Phone number comma separated" id="telephone" name="telephone" class="w-full form-input" />
        <ErrorMessage name="telephone" v-slot="{ message }">
          <p class="input-error">{{ message }}</p>
        </ErrorMessage>
        <Field name="relationship" placeholder="Describe your experience in this field of education" class="form-textarea mb-4"></Field>
        <ErrorMessage name="relationship" v-slot="{ message }">
          <p class="input-error">{{ message }}</p>
        </ErrorMessage>
        <!-- <span class="text-red-700 text-base">{{ error }}</span> -->

        <div class="flex flex-row h-1/2 w-full items-center justify-between mt-5">
          <button class="btn-unstate" @click.prevent.stop="closeModal">Cancel</button>
          <button type="submit" class="btn-primary">
            <span class="font-bold text-white" v-if="!isSubmitting">Add</span>
            <CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
          </button>
        </div>
      </Form>
    </MyModal>
    <MyModal v-show="showModalAddExper" @close="showModalAddExper = false">
      <template #header>
        <h1 class="text-4xl">Add Experience</h1>
      </template>
      <Form class="flex flex-col justify-between" @submit="addExperience" v-slot="{ isSubmitting }" :validation-schema="experienceSchema" :initial-values="experienceValue" @invalid-submit="onInvalidEducation">
        <div class="flex sm:flex-col md:flex-row md:justify-between">
          <div class="w-full">
            <Field name="position" placeholder="Position at company" class="form-input mb-2 w-full"></Field>
            <ErrorMessage name="position" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
          </div>
        </div>
        <div class="">
          <Field name="company" placeholder="Name of company" class="form-input mb-2 w-full"></Field>
          <ErrorMessage name="company" v-slot="{ message }">
            <p class="input-error">{{ message }}</p>
          </ErrorMessage>
        </div>
        <div class="">
          <Field name="start" type="date" placeholder="Start date" class="form-input mb-2 w-full"></Field>
          <ErrorMessage name="start" v-slot="{ message }">
            <p class="input-error">{{ message }}</p>
          </ErrorMessage>
        </div>
        <div class="">
          <Field name="end" type="date" placeholder="End date" class="form-input mb-2 w-full"></Field>
          <ErrorMessage name="end" v-slot="{ message }">
            <p class="input-error">{{ message }}</p>
          </ErrorMessage>
        </div>
        <Field name="description" as="textarea" placeholder="Describe your experience in this field of education" class="form-textarea mb-4"></Field>
        <ErrorMessage name="description" v-slot="{ message }">
          <p class="input-error">{{ message }}</p>
        </ErrorMessage>
        <span class="text-red-700 text-base">{{ error }}</span>

        <div class="flex flex-row h-1/2 w-full items-center justify-between">
          <button class="btn-unstate" @click.prevent.stop="closeModal">Cancel</button>
          <button type="submit" class="btn-primary">
            <span class="font-bold text-white" v-if="!isSubmitting">Add</span>
            <CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
          </button>
        </div>
      </Form>
    </MyModal>
    <MyModal v-show="showModalUpdateExper" @close="showModalUpdateExper = false">
      <template #header>
        <h1 class="text-4xl">Update Experience</h1>
      </template>
      <Form class="flex flex-col justify-between" @submit="updateExperience" v-slot="{ isSubmitting }" :validation-schema="experienceSchema" :initial-values="experienceValue" @invalid-submit="onInvalidExperience">
        <div class="flex sm:flex-col md:flex-row md:justify-between">
          <div class="w-full">
            <Field name="position" placeholder="Position at company" class="form-input mb-2 w-full"></Field>
            <ErrorMessage name="position" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
          </div>
        </div>
        <div class="">
          <Field name="company" placeholder="Name of company" class="form-input mb-2 w-full"></Field>
          <ErrorMessage name="company" v-slot="{ message }">
            <p class="input-error">{{ message }}</p>
          </ErrorMessage>
        </div>
        <div class="">
          <Field name="start" type="date" placeholder="Start date" class="form-input mb-2 w-full"></Field>
          <ErrorMessage name="start" v-slot="{ message }">
            <p class="input-error">{{ message }}</p>
          </ErrorMessage>
        </div>
        <div class="">
          <Field name="end" type="date" placeholder="End date" class="form-input mb-2 w-full"></Field>
          <ErrorMessage name="end" v-slot="{ message }">
            <p class="input-error">{{ message }}</p>
          </ErrorMessage>
        </div>
        <Field name="description" as="textarea" placeholder="Describe your experience in this field of education" class="form-textarea mb-4"></Field>
        <ErrorMessage name="description" v-slot="{ message }">
          <p class="input-error">{{ message }}</p>
        </ErrorMessage>
        <span class="text-red-700 text-base">{{ error }}</span>

        <div class="flex flex-row h-1/2 w-full items-center justify-between">
          <button class="btn-unstate" @click.prevent.stop="closeModal">Cancel</button>
          <button type="submit" class="btn-primary">
            <span class="font-bold text-white" v-if="!isSubmitting">Update</span>
            <CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
          </button>
        </div>
      </Form>
    </MyModal>
    <MyModal v-show="showModalUpdateEducation" @close="showModalUpdateEducation = false">
      <template #header>
        <h1 class="text-4xl">Update Education</h1>
      </template>
      <Form class="flex flex-col justify-between" @submit="updateEducation" v-slot="{ isSubmitting }" :validation-schema="educationSchema" :initial-values="educationValue" @invalid-submit="onInvalidEducation">
        <div class="flex sm:flex-col md:flex-row md:justify-between">
          <div class="w-full">
            <Field name="name" placeholder="Position at company" class="form-input mb-2 w-full"></Field>
            <ErrorMessage name="position" v-slot="{ message }">
              <p class="input-error">{{ message }}</p>
            </ErrorMessage>
          </div>
        </div>
        <div class="">
          <Field name="from_school" placeholder="Name of school" class="form-input mb-2 w-full"></Field>
          <ErrorMessage name="from_school" v-slot="{ message }">
            <p class="input-error">{{ message }}</p>
          </ErrorMessage>
        </div>
        <div class="">
          <Field name="start" type="date" placeholder="Start date" class="form-input mb-2 w-full"></Field>
          <ErrorMessage name="start" v-slot="{ message }">
            <p class="input-error">{{ message }}</p>
          </ErrorMessage>
        </div>
        <div class="">
          <Field name="end" type="date" placeholder="End date" class="form-input mb-2 w-full"></Field>
          <ErrorMessage name="end" v-slot="{ message }">
            <p class="input-error">{{ message }}</p>
          </ErrorMessage>
        </div>
        <Field name="description" as="textarea" placeholder="Describe your experience in this field of education" class="form-textarea mb-4"></Field>
        <ErrorMessage name="description" v-slot="{ message }">
          <p class="input-error">{{ message }}</p>
        </ErrorMessage>
        <span class="text-red-700 text-base">{{ error }}</span>

        <div class="flex flex-row h-1/2 w-full items-center justify-between">
          <button class="btn-unstate" @click.prevent.stop="closeModal">Cancel</button>
          <button type="submit" class="btn-primary">
            <span class="font-bold text-white" v-if="!isSubmitting">Update</span>
            <CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
          </button>
        </div>
      </Form>
    </MyModal>
    <MyModal v-show="showModalDeleteEmployee" @close="showModalDeleteEmployee = false">
      <template #header>
        <h1 class="text-4xl">Delete employee</h1>
      </template>
      <div class="col">
        <span class="my-5 text-2xl"> Do you really want to delete this employee ? </span>
        <div class="row justify-between">
          <button class="btn-unstate" @click="showModalDeleteEmployee = false">Cancel</button>
          <button class="btn-danger text-red bg-red-100" @click="deleteEmployee">Delete</button>
        </div>
      </div>
    </MyModal>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router"
import { parseISO } from "date-fns"
import { ref, computed, onBeforeMount } from "vue"
import { useManagement } from "@/store/management"
import { toast, goto, chance } from "@/utils/utils"
import { onBeforeRouteUpdate } from "vue-router"
import { isLength, isDate, isEmail } from "validator"
import { CirclesToRhombusesSpinner } from "epic-spinners"
import { Form, Field, ErrorMessage } from "vee-validate"
import MyModal from "@/components/mymodal"
import api_resources from "@/api/resources.js"

const error = computed(() => store.error)
const store = useManagement()
const route = useRoute()
const userData = computed(() => store.employees.find((emp) => emp._id == route.params.id))
const edit_mode = ref(false)
const onboardings = computed(() => Object.fromEntries(new Map(userData.value.onboarding.map((obj) => [obj["field"], obj["state"]]))))
const showModalAddExper = ref(false)
const showModalUpdateDoc = ref(false)
const showModalAddContact = ref(false)
const showModalUpdateExper = ref(false)
const showModalAddEducation = ref(false)
const showModalDeleteEmployee = ref(false)
const showModalUpdateEducation = ref(false)
const basicInfo = ref({
  position: userData.value.position,
  last_name: userData.value.last_name,
  middle_name: userData.value.middle_name,
  first_name: userData.value.first_name,
  telephones: userData.value.telephones,
  middle_name: userData.value.middle_name,
  email: userData.value.email,
})
const tabsEmp = ref([
  { name: "Basic Information", current: true },
  { name: "Account and Settings", current: false },
  { name: "Employement status", current: false },
])

const currentTab = computed(() => tabsEmp.value.find((tab) => tab.current).name.toLowerCase())
const basicInfoSchema = {
  position(value) {
    return isLength(value, { min: 2, max: 50 }) ? true : "Position must be between 2 and 50 characters"
  },
  email(value) {
    return isEmail(value) ? true : "Must be valid Email"
  },
  first_name(value) {
    return isLength(value, { min: 2, max: 20 }) ? true : "First name must be between 2 and 20 characters"
  },
  last_name(value) {},
  telephones(value) {
    return isLength(value, { min: 10 }) ? true : "telephones must be 10 characters or more"
  },
  middle_name(value) {
    return isLength(value, { min: 2, max: 20 }) ? true : "Middle name must be between 2 and 20 characters"
  },
}
onBeforeMount(() => {
  console.log("LEKA")
  console.log(api_resources.getById(userData.value?.profile_image))
})
onBeforeRouteUpdate(async (to, from) => {
  console.log(api_resources.getById(userData.value?.profile_image))
  if (to.params.id !== from.params.id) {
    const result = await store.employeeBy(to.params.id)
    if (result) {
      toast("Route id changed to %s...", to.params.id)
    } else {
      toast.danger("Something went wrong on refreshing. Try later")
    }
  }
})
const passwordSchema = ref({
  password(value) {
    return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 20"
  },
  password_verif(value) {
    return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 20"
  },
})
const docSchema = ref({
  myfile(value) {
    if (value instanceof File || value instanceof Blob) {
      return true
    }
    return "Vous devez choisir un fichier texte"
  },
})
const contactSchema = ref({
  name(value) {
    return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 20"
  },
  telephone(value) {
    return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 20"
  },
  email(value) {
    return isEmail(value) ? true : "Un email valide est attendu"
  },
  relationship(value) {
    return isLength(value, { min: 3, max: 20 }) ? true : "Le minimum de caracteres est 3 et le maximum 20"
  },
})
const contactValue = ref({
  name: chance.last(),
  telephone: chance.phone({ country: "fr", mobile: true }),
  email: chance.email(),
  relationship: "Father",
})
const educationValue = ref({
  from_school: "Catalyst",
  name: "Master of science",
  start: "2018-05-05",
  end: "2020-02-02",
  description: "La description des cours",
})
const passwordValue = ref({
  password: "123456",
  password_verif: "123456",
})
const experienceValue = ref({
  company: "Google",
  position: "Frontend developer",
  start: "2018-05-05",
  end: "2020-02-02",
  description: "La description de ton experience",
})
const educationSchema = ref({
  end(value) {
    return isDate(parseISO(value)) ? true : "End date must be provided"
  },
  name(value) {
    return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 12"
  },
  start(value) {
    return isDate(parseISO(value)) ? true : "Start date must be provided"
  },
  from_school(value) {
    return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 12"
  },
  description(value) {
    return isLength(value, { min: 3, max: 200 }) ? true : "Le minimum de caracteres est 2 et le maximum 200"
  },
})
const experienceSchema = ref({
  position(value) {
    return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 12"
  },
  start(value) {
    return isDate(parseISO(value)) ? true : "Start date must be provided"
  },
  end(value) {
    return isDate(parseISO(value)) ? true : "End date must be provided"
  },
  company(value) {
    return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 12"
  },
  description(value) {
    return isLength(value, { min: 3, max: 200 }) ? true : "Le minimum de caracteres est 2 et le maximum 200"
  },
})
const docs = ref([
  {
    name: "resume",
    link: "https://resume.com",
  },
  { name: "cover_letter", link: "https://resume.com" },
  { name: "school_diploma", link: "https://resume.com" },
])
async function deleteContact(contactID) {
  const result = await store.deleteContact(route.params.id, contactID)
  if (result) {
    closeModal()
    toast.success(`Remove Contact with id ${contactID}`)
  } else {
    toast.error("Can't delete education for this employee")
  }
}
async function deleteEducation(educationID) {
  const result = await store.deleteEducation(route.params.id, educationID)
  if (result) {
    closeModal()
    toast.success(`Remove Education with id ${educationID}`)
  } else {
    toast.error("Can't delete education for this employee")
  }
}
async function deleteExperience(experienceID) {
  const result = await store.deleteExperience(route.params.id, experienceID)
  if (result) {
    closeModal()
    toast.success(`Remove Experience with id ${experienceID}`)
  } else {
    toast.error("Can't delete experience for this employee")
  }
}
async function launchUpdateExperience(experienceID) {
  const ud = userData.value["experiences"].find((exp) => exp.id == experienceID)
  experienceValue.value = ud
  showModalUpdateExper.value = true
}
async function launchUpdateEducation(educationID = 4) {
  const ud = userData.value["educations"].find((edu) => edu.id == educationID)
  console.log({ ...ud })
  educationValue.value = { ...ud }
  showModalUpdateEducation.value = true
}
async function updateExperience(updatedExperience) {
  try {
    const result = await store.updateExperience(route.params.id, experienceValue.value.id, updatedExperience)
    if (result) {
      closeModal()
      toast.success(`Update Experience with id ${experienceValue.value.id}`)
    } else {
      toast.error("Can't update experience for this employee")
    }
  } catch (error) {
    console.log(error)
  }
}
async function updateEducation(updatedEducation) {
  try {
    const result = await store.updateEducation(route.params.id, educationValue.value.id, updatedEducation)
    if (result) {
      closeModal()
      toast.success(`Update education with id ${educationValue.value.id}`)
    } else {
      toast.error("Can't update education for this employee")
    }
  } catch (error) {
    console.log(error)
  }
}
async function updateBiography(biography) {
  try {
    const result = await store.updateBiography(route.params.id, biography)
    if (result) {
      closeModal()
      toast.success(`Update biography with id ${educationValue.value.id}`)
    } else {
      toast.error("Can't update biography for this employee")
    }
  } catch (error) {
    console.log(error)
  }
}
async function deleteEmployee() {
  goto("employees-list")
  const result = await store.deleteEmployee(route.params.id)
  if (result) {
  } else {
    toast.error("Can't delete this employee")
  }
}
async function addEducation(values) {
  const result = await store.addEducation(route.params.id, values)
  if (result) {
    closeModal()
    toast(`Added ${values.name} to education`)
  } else {
    toast.error("Impossible d'ajouter une education a cette employee")
  }
}
async function addExperience(values) {
  const result = await store.addExperience(route.params.id, values)
  if (result) {
    closeModal()
    toast(`Added ${values.name} to experience ${result}`)
  } else {
    toast.error("Impossible d'ajouter une experience a cette employee", result)
  }
}
async function addContact(values) {
  const result = await store.addEmergencyContact(route.params.id, values)
  if (result) {
    closeModal()
    toast(`Added ${contactValue.value.name} to contacts`)
  } else {
    toast.error("Impossible d'ajouter un contact a cette employee")
  }
}
async function updatePassword(values) {
  const result = await store.updateEmployeeConnexion(route.params.id, values)
  if (result) {
    closeModal()
    toast(`Successfully update password`)
  } else {
    toast.error("Something went wrong in updating password")
  }
}
async function refresh() {
  const result = await store.employeeBy(route.params.id)
  if (result) {
    closeModal()
    toast(`Refreshed...`)
  } else {
    toast.danger("Something went wrong on refreshing. Try later")
  }
}
function closeModal() {
  // edit_mode.value = false
  showModalAddExper.value = false
  showModalUpdateDoc.value = false
  showModalAddContact.value = false
  showModalUpdateExper.value = false
  showModalAddEducation.value = false
  showModalDeleteEmployee.value = false
  showModalUpdateEducation.value = false
}
function onInvalidEducation({ values, result, errors }) {
  console.log("Invalid education", errors)
}
function onInvalidExperience({ values, result, errors }) {
  console.log("Invalid experience", errors)
}
function onInvalidContact({ values, result, errors }) {
  console.log("Invalid experience ", errors)
}
function onInvalidPassword({ values, result, errors }) {
  console.log("Invalid password ", errors)
}
function invalidBio({ values, result, errors }) {
  console.log("Invalid biography ", errors)
}
function invalidFile({ values, result, errors }) {
  console.log("Invalid File ", errors)
}
function onInvalidBasicInfo({ values, result, errors }) {
  console.log("Invalid basic info ", errors)
}
async function updateOnboarding(values) {
  console.log(values)
  const result = await store.updateOnboarding(route.params.id, values)
  if (result) {
    closeModal()
    toast(`Onboarding states was updated successfully`)
  } else {
    toast.error("Can't update onboarding")
  }
}
async function changeDocument(values) {
  const formdata = new FormData()
  formdata.append("file", values["myfile"])
  try {
    const result = store.changedoc(route.params.id, formdata)
    if (result) {
      closeModal()
      toast("Changed dox successfully...")
    } else {
      toast.error("Impossible de changer le document")
    }
  } catch (err) {
    console.log(err)
  }
}
async function changepicture() {}
async function updateBasic() {}
function changeTab(index) {
  const currentTrue = tabsEmp.value.findIndex((tab) => tab.current == true)
  tabsEmp.value[currentTrue].current = false
  tabsEmp.value[index].current = true
}
</script>

<style lang="scss" scoped></style>
