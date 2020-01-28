<template>
  <div>
    <header>
      <div class="logo">
        QOALA-TEST
      </div>
      <div class="buttons">
        <base-button text="Color" @click="sortByColor" />
        <base-button text="Cities" @click="sortByCity" />
      </div>
    </header>
    <div id="home">
      <p class="text error" v-if="isError">{{ errorMessage }}</p>
      <div v-if="!isError" id="scroll-container">
        <div class="card-container" v-for="user in users" :key="user.email">
          <user-card :user="user" />
        </div>
        <p class="text loading" v-if="isLoading">
          Fetching More
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton';
import UserCard from '@/components/UserCard';

import { getRandomUsers } from '@/services/randomUser';
import {
  getAttributesShown,
  getLocalStorageItem,
  writeToLocalStorage,
} from '@/helpers';

export default {
  name: 'Home',

  components: {
    BaseButton,
    UserCard,
  },

  created() {
    this.onCreatedGetRandomUsers();
  },

  mounted() {
    // Set up scroll event listeners

    const scrollContainer = document.querySelector('#scroll-container');
    this.scrollHorizontalEventListener = scrollContainer.addEventListener(
      'scroll',
      evt => {
        const maxScrollLeft = evt.target.scrollWidth - evt.target.clientWidth;
        const maxScrollTop = evt.target.scrollHeight - evt.target.clientHeight;

        if (evt.target.scrollLeft === maxScrollLeft) {
          this.onScrollEndGetMore();
        }
      },
    );

    this.scrollVerticalEventListener = window.addEventListener(
      'scroll',
      evt => {
        const maxScrollTop =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;

        if (document.documentElement.scrollTop === maxScrollTop) {
          this.onScrollEndGetMore();
        }
      },
    );
  },

  destroyed() {
    const scrollContainer = document.querySelector('#scroll-container');
    scrollContainer.removeEventListener(
      'scroll',
      this.scrollHorizontalEventListener,
    );
    window.removeEventListener('scroll', this.scrollVerticalEventListener);
  },

  data() {
    return {
      errorMessage: '',
      isLoading: false,
      pageIndex: parseInt(localStorage.getItem('_index'), 10) || 1,
      scrollHorizontalEventListener: () => undefined,
      scrollVerticalEventListener: () => undefined,
      users: [],
    };
  },

  methods: {
    async onCreatedGetRandomUsers() {
      try {
        // Check local storage first for the data;
        const usersData = getLocalStorageItem('_usersData');

        if (!usersData) {
          // Fetch from the api if data from local storage is not defined
          const response = await getRandomUsers();
          if (response.error) throw new Error(response.error);

          let { results } = response;

          results = results.map(el =>
            getAttributesShown(el, [
              'name',
              'location',
              'picture',
              'dob',
              'email',
            ]),
          );

          //Get first 10 of the data to display. set it to instance state
          this.users = results.slice(0, 10);

          writeToLocalStorage('_usersData', results);
        }
        this.users = usersData.slice(0, this.pageIndex * 10);
      } catch (error) {
        if (error.message) {
          this.errorMessage = error.message;
        } else
          this.errorMessage = `Something's wrong. Reload the page or try again later.`;
      }
    },

    sortByColor() {
      const redBg = this.users.filter(user => parseInt(user.dob.age, 10) <= 21);
      const greenBg = this.users.filter(
        user =>
          parseInt(user.dob.age, 10) > 21 && parseInt(user.dob.age, 10) < 56,
      );
      const blueBg = this.users.filter(
        user => parseInt(user.dob.age, 10) >= 56,
      );

      const results = [...greenBg, ...blueBg, ...redBg];

      this.users = results;
    },

    sortByCity() {
      const results = this.users.sort((userA, userB) => {
        const { city: cityA } = userA.location;
        const { city: cityB } = userB.location;

        if (cityA < cityB) {
          return -1;
        } else if (cityA > cityB) {
          return 1;
        } else return 0;
      });

      this.users = results;
    },

    onScrollEndGetMore() {
      this.isLoading = true;
      // Timeout to simulate api call event
      setTimeout(() => {
        // Check localStorage for data, fetch if data is not defined
        let usersData = getLocalStorageItem('_usersData');

        if (!usersData) {
          this.onCreatedGetRandomUsers();
          usersData = getLocalStorageItem('_usersData');
        }

        const maxLength = usersData.length;

        if (this.pageIndex * 10 < maxLength && this.isLoading) {
          // pageIndex to identify how far the user has scrolled
          // While it's still not the end of the data, increment it everytime scroll ends
          // Update the index in localStorage as well
          this.pageIndex += 1;
          localStorage.setItem('_index', String(this.pageIndex));

          // Get data based on current users data and pageIndex
          const dataToAppend = usersData.slice(
            this.users.length,
            this.pageIndex * 10,
          );
          // Append it to current users data
          this.users = [...this.users, ...dataToAppend];
          this.isLoading = false;
        }
      }, 1000);
    },
  },

  computed: {
    isError() {
      return Boolean(this.errorMessage);
    },
  },
};
</script>

<style scoped>
#home {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

header {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
}

header .logo {
  font-size: 36px;
  font-weight: bold;
  cursor: default;
}

header .buttons {
  align-self: center;
  display: flex;
}

header .buttons > button {
  background-color: #ff803a;
  color: white;
  padding: 10px;
  border-radius: 4px;
  font-size: 20px;
  text-transform: uppercase;
  cursor: pointer;
}

header .buttons > button:hover {
  background-color: #ffaa36;
}

header .buttons > button:focus {
  outline: none;
}

header .buttons > button:first-child {
  margin-right: 10px;
}

#scroll-container {
  min-width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
}

.card-container {
  padding: 15px;
}

.text {
  align-self: center;
}

.error {
  color: red;
  font-size: 24px;
}

.loading {
  color: inherit;
  font-size: 18px;
  font-weight: bold;
}

@media (min-width: 780px) {
  #home {
    padding: 10px 50px;
  }

  #scroll-container {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding: 5px;
  }

  .loading {
    color: inherit;
    font-size: 24px;
  }
}
</style>
