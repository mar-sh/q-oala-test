<template>
  <div :class="`card ${colorByAge}`">
    <div class="card-avatar">
      <img :src="avatarImageURL" alt="picsum" />
    </div>
    <div class="card-bio">
      <i class="fa fa-user" aria-hidden="true"></i> {{ `${fullName},` }}
      <span>{{ `${age} years old` }}</span>
    </div>

    <div class="card-location">
      <i class="fa fa-map-marker" aria-hidden="true"></i> {{ location }}
    </div>

    <div class="card-contact">
      <i class="fa fa-envelope-o" aria-hidden="true"></i> {{ user.email }}
    </div>

    <div class="card-masonry-effect" :style="`height: ${addHeight}`"></div>
  </div>
</template>

<script>
export default {
  /**
   * @name UserCard propTypes.
   * @type {propTypes}
   * @param {Object} user User object with contents needed
   * @property {Number} index Index in iteration, depends on the number it'll assign different height to give card the masonry-effect
   * @description Card with desktop and mobile layout using CSS grid
   */

  name: 'UserCard',
  props: {
    user: Object,
    index: Number,
  },
  computed: {
    colorByAge() {
      const { age } = this.user.dob;

      if (parseInt(age, 10) <= 21) return 'red';
      if (parseInt(age, 10) > 21 && parseInt(age, 10) < 56) return 'green';
      if (parseInt(age, 10) >= 56) return 'blue';
    },

    fullName() {
      const { title, first, last } = this.user.name;

      return `${title}. ${first} ${last}`;
    },

    age() {
      const { age } = this.user.dob;

      return age;
    },

    location() {
      const { city, state, postcode } = this.user.location;

      return `${city}, ${state}, ${postcode}`;
    },

    avatarImageURL() {
      const { large } = this.user.picture;

      return large;
    },

    addHeight() {
      const heights = [0, 150, 300];
      const index = (this.index + 3) % 3;

      return `${heights[index]}px`;
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 100%;
  display: grid;
  grid-template-areas:
    'avatar bio'
    'avatar contact'
    'location location';
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 0.25fr minmax(0, 1fr);
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.75);
  color: white;
  font-size: 16px;
}

.card-avatar {
  grid-area: avatar;
  margin-right: 10px;
  margin-bottom: 5px;
}

.card-avatar img {
  object-fit: contain;
  border: 0.5px solid white;
  border-radius: 4px;
  width: 100px;
}

.card-bio {
  grid-area: bio;
  font-size: 14px;
  overflow-wrap: break-word;
}

.card-bio span {
  display: block;
}

.card-location {
  grid-area: location;
  font-size: 14px;
}

.card-contact {
  grid-area: contact;
  font-weight: bold;
  font-size: 14px;
  overflow-wrap: break-word;
}

.green {
  background-color: #70be42;
}

.blue {
  background-color: #0266b1;
}

.red {
  background-color: #ec403e;
}

.card-masonry-effect {
  display: none;
  margin-bottom: 0px;
}

@media (min-width: 780px) {
  .card {
    display: grid;
    grid-template-areas:
      'avatar'
      'bio'
      'location'
      'contact';
    grid-template-rows: 2fr 0.75fr 0.5fr 0.25fr;
    grid-template-columns: 1fr;
    width: 350px;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.75);
    color: white;
  }

  .card-avatar {
    margin: 0 auto;
  }

  .card-avatar img {
    object-fit: contain;
    border: 0.5px solid white;
    border-radius: 50%;
    width: 150px;
  }
  .card-bio {
    font-size: 18px;
  }

  .card-location {
    font-size: 18px;
  }
  .card-contact {
    font-size: 18px;
  }

  .card-masonry-effect {
    display: block;
  }
}
</style>
