<template>

  <div style="padding: 24px">
    <div style="border: 2px solid blue;">
      <button>
        Before
      </button>
      <div class="fieldset" style="border: 2px solid red;">
        <label class="fieldset-label">Default landing page</label>
        <KRadioButton
          ref="landingPageRadio0"
          label="Learn page"
          :value="landingPageChoices.LEARN"
          :currentValue="landingPage"
          @input="(option) => handleLandingPageChange(option, 0)"
        />
        <KRadioButton
          ref="landingPageRadio1"
          label="Sign-in page"
          :value="landingPageChoices.SIGN_IN"
          :currentValue="landingPage"
          @input="(option) => handleLandingPageChange(option, 1)"
        />
        <div class="fieldset" style="margin-left: 32px; border: 2px solid green;">
          <KRadioButton
            ref="landingPageRadio3"
            label="Allow users to explore resources without signing in"
            :value="SignInPageOptions.ALLOW_GUEST_ACCESS"
            :currentValue="signInPageOption"
            :disabled="disableSignInPageOptions"
            @input="(option) => handleSignInPageChange(option, 2)"
          />
          <KRadioButton
            ref="landingPageRadio4"
            label="Learners must sign in to explore resources"
            :value="SignInPageOptions.DISALLOW_GUEST_ACCESS"
            :currentValue="signInPageOption"
            :disabled="disableSignInPageOptions"
            @input="(option) => handleSignInPageChange(option, 3)"
          />
          <KRadioButton
            ref="landingPageRadio5"
            label="Signed in learners should only see resources assigned to them in classes"
            :value="SignInPageOptions.LOCKED_CONTENT"
            :currentValue="signInPageOption"
            :disabled="disableSignInPageOptions"
            @input="(option) => handleSignInPageChange(option, 4)"
          />
        </div>
      </div>
      <button>
        After
      </button>
    </div>

    <div style="border: 2px solid blue; margin-top: 50px;">
      <button ref="beforeComponentSecond">
        Before
      </button>
      <div style="border: 2px solid orangered;">
        <KRadioButton
          ref="optionRadio1"
          v-model="exampleValue"
          label="Option A"
          value="val-a"
          @input="(option) => handleInputChange(5)"
        />
        <KRadioButton
          ref="optionRadio2"
          v-model="exampleValue"
          label="Option B"
          value="val-b"
          @input="(option) => handleInputChange(6)"
        />
        <KRadioButton
          ref="optionRadio3"
          v-model="exampleValue"
          label="Option C"
          description="This one is special!"
          buttonValue="val-c"
          @input="(option) => handleInputChange(7)"
        />
        <KRadioButton
          ref="optionRadio4"
          v-model="exampleValue"
          label="Truncated label. Adjusting your browser window size to see this in action."
          buttonValue="val-d"
          truncateLabel
          @input="(option) => handleInputChange(8)"
        />

        <p>
          Current value: {{ exampleValue }}
        </p>
      </div>
      <button ref="afterComponentSecond">
        After
      </button>
    </div>

    <div style="border: 2px solid blue; margin: 50px;">
      <button ref="beforeComponentThird">
        Before
      </button>
      <div style="border: 2px solid orangered;">
        <KGrid>
          <KGridItem
            v-for="(languageCol, index) in splitLanguageOptions"
            :key="index"

            :layout8="{ span: 4 }"
            :layout12="{ span: 6 }"
          >
            <KRadioButton
              v-for="(language, idx) in languageCol"
              :key="language.id"
              ref="languageItem"
              v-model="selectedLanguage"
              :buttonValue="language.id"
              :label="language.lang_name"
              :title="language.english_name"
              class="language-name"
              @input="(option) => {
                const BASE_NUMBER_OFFSET = 9;
                const ADJUSTED_NUMBER_OFFSET = 2;
                const baseNumber = Number(`${index}${idx}`);
                const adjustedNumber = index === 1 ? baseNumber - ADJUSTED_NUMBER_OFFSET + BASE_NUMBER_OFFSET : baseNumber + BASE_NUMBER_OFFSET;
                handleInputChange(adjustedNumber)
              }"
            />
          </KGridItem>
        </KGrid>
      </div>
      <button ref="beforeComponentThird">
        After
      </button>
    </div>
  </div>

</template>


<script>

  const SignInPageOptions = Object.freeze({
    LOCKED_CONTENT: 'LOCKED_CONTENT',
    DISALLOW_GUEST_ACCESS: 'DISALLOW_GUEST_ACCESS',
    ALLOW_GUEST_ACCESS: 'ALLOW_GUEST_ACCESS',
  });

  const LandingPageChoices = {
    SIGN_IN: 'sign-in',
    LEARN: 'learn',
  };

  const currentLanguage = 'en';
  const languageOptions = [
    { id: 'el', lang_name: 'Ελληνικά', english_name: 'Greek', lang_direction: 'ltr' },
    { id: 'bg-bg', lang_name: 'Български', english_name: 'Bulgarian', lang_direction: 'ltr' },
    { id: 'uk', lang_name: 'Украї́нська мо́ва', english_name: 'Ukrainian', lang_direction: 'ltr' },
    { id: 'ar', lang_name: 'العَرَبِيَّة‎‎', english_name: 'Arabic', lang_direction: 'rtl' },
    {
      id: 'ur-pk',
      lang_name: 'اُردو (پاکستان)‏',
      english_name: 'Urdu (Pakistan)',
      lang_direction: 'rtl',
    },
    { id: 'fa', lang_name: 'فارسی', english_name: 'Farsi', lang_direction: 'rtl' },
    { id: 'mr', lang_name: 'मराठी', english_name: 'Marathi', lang_direction: 'ltr' },
    {
      id: 'hi-in',
      lang_name: 'हिंदी (भारत)',
      english_name: 'Hindi (India)',
      lang_direction: 'ltr',
    },
    { id: 'bn-bd', lang_name: 'বাংলা', english_name: 'Bengali', lang_direction: 'ltr' },
    { id: 'gu-in', lang_name: 'ગુજરાતી', english_name: 'Gujarati', lang_direction: 'ltr' },
    { id: 'te', lang_name: 'తెలుగు', english_name: 'Telugu', lang_direction: 'ltr' },
    { id: 'my', lang_name: 'ဗမာစာ', english_name: 'Burmese', lang_direction: 'ltr' },
    { id: 'ka', lang_name: 'ქართული', english_name: 'Georgian', lang_direction: 'ltr' },
    { id: 'km', lang_name: 'ភាសាខ្មែរ', english_name: 'Khmer', lang_direction: 'ltr' },
    {
      id: 'zh-hans',
      lang_name: '简体中文',
      english_name: 'Simplified Chinese',
      lang_direction: 'ltr',
    },
    { id: 'ko', lang_name: '한국어', english_name: 'Korean', lang_direction: 'ltr' },
  ];

  /*
      Playground is a Vue component too,
      so you can also use `data`, `methods`, etc.
      as usual if helpful
    */
  export default {
    name: 'Playground',
    data() {
      return {
        radioRefs: [],
        focusedRadioIdx: 0,
        firstRadioIdx: 0,
        lastRadioIdx: 0,

        SignInPageOptions,
        landingPage: LandingPageChoices.SIGN_IN,
        landingPageChoices: LandingPageChoices,
        currentValue: '',
        signInPageOption: '',

        exampleValue: 'val-b',

        selectedLanguage: currentLanguage,
      };
    },
    computed: {
      disableSignInPageOptions() {
        return this.landingPage !== LandingPageChoices.SIGN_IN;
      },
      splitLanguageOptions() {
        const secondCol = languageOptions;
        const firstCol = secondCol.splice(0, Math.ceil(secondCol.length / 2));

        return [firstCol, secondCol];
      },
    },
    mounted() {
      // Pust each radio button of a single group into a list
      // then add 'keyup' listener to each radio button

      this.$nextTick(() => {
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
          for (let ref in this.$refs) {
            if (ref.startsWith('landingPageRadio') || ref.startsWith('optionRadio')) {
              this.radioRefs.push(this.$refs[ref]);
              this.$refs[ref].$el.addEventListener('keyup', this.onKeyUp);
            }
          }
          // For KRadioButton which are renderied with v-for
          for (let ref of this.$refs.languageItem) {
            this.radioRefs.push(ref);
            ref.$el.addEventListener('keyup', this.onKeyUp);
          }
          this.lastRadioIdx = this.radioRefs.length - 1;
        }
      });
    },
    beforeDestroy() {
      // Remove event listeners
      for (let ref in this.$refs) {
        if (ref.startsWith('landingPageRadio') || ref.startsWith('optionRadio')) {
          this.$refs[ref].$el.removeEventListener('keyup', this.onKeyUp);
        }
      }
      for (let ref of this.$refs.languageItem) {
        this.radioRefs.push(ref);
        ref.$el.removeEventListener('keyup', this.onKeyUp);
      }
    },
    methods: {
      // For tab logic currenly not working
      // onTabUp(event, refName) {
      //   event.preventDefault();
      //   event.stopPropagation();
      //   console.log(this.$refs[refName]);
      //   this.$refs[refName].focus();
      // },
      handleLandingPageChange(option, idx) {
        this.focusedRadioIdx = idx;
        this.landingPage = option;
        if (option === LandingPageChoices.LEARN) {
          this.signInPageOption = '';
        } else {
          this.signInPageOption = SignInPageOptions.ALLOW_GUEST_ACCESS;
        }
      },
      handleSignInPageChange(option, idx) {
        this.focusedRadioIdx = idx;
        this.signInPageOption = option;
      },
      handleInputChange(idx) {
        this.focusedRadioIdx = idx;
      },
      onKeyUp(event) {
        const handlers = {
          ArrowLeft: this.focusPreviousRadio,
          ArrowRight: this.focusNextRadio,
          ArrowUp: this.focusPreviousRadio,
          ArrowDown: this.focusNextRadio,
        };
        const handler = handlers[event.key];
        if (handler) {
          event.preventDefault();
          event.stopPropagation();
          handler(event);
        }
      },
      focusPreviousRadio(event) {
        let newFocusedRadioIdx =
          this.focusedRadioIdx === this.firstRadioIdx
            ? this.lastRadioIdx
            : this.focusedRadioIdx - 1;
        // When we try to go to signInPage's last option & it is disabled then
        // instead change the newFoucusedRadioIdx to the second radio Idx.
        if (this.radioRefs[newFocusedRadioIdx].disabled) {
          newFocusedRadioIdx = this.firstRadioIdx + 1;
        }
        this.focusRadio(event, newFocusedRadioIdx);
      },
      focusNextRadio(event) {
        const newFocusedRadioIdx =
          this.focusedRadioIdx === this.lastRadioIdx
            ? this.firstRadioIdx
            : this.focusedRadioIdx + 1;
        this.focusRadio(event, newFocusedRadioIdx);
      },
      focusRadio(event, radioIdx) {
        if (radioIdx !== undefined && radioIdx !== null) {
          this.focusedRadioIdx = radioIdx;
          this.radioRefs[radioIdx].toggleCheck(event);
        }
      },
    },
  };

</script>
