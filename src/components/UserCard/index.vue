<template>
  <div :class="`card ${colorByAge}`">
    <div class="card-avatar">
      <img :src="avatarImageURL" alt="picsum" width="200" />
    </div>
    <div class="card-bio">
      {{ `${fullName},` }} <span>{{ `${age} years old` }}</span>
    </div>

    <div class="card-location">{{ location }}</div>

    <div class="card-contact">{{ user.email }}</div>

    <div
      class="card-masonry-effect"
      :style="`margin-bottom: ${randomSpacing}`"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',

  props: {
    user: Object,
  },

  created() {},

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
    randomSpacing() {
      const spacing = String(Math.floor(Math.random(0) * 200));

      return `${spacing}px`;
    },
  },
};
</script>

<style scoped>
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
  grid-area: avatar;
  margin: 0 auto;
}

.card-avatar img {
  object-fit: contain;
  border: 0.5px solid white;
  border-radius: 50%;
}

.card-bio {
  grid-area: bio;
  font-size: 18px;
}

.card-bio span {
  display: block;
}

.card-location {
  grid-area: location;
}

.card-contact {
  grid-area: contact;
  font-size: 18px;
  font-weight: bold;
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
</style>
