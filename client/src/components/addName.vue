<template>
    <div>
      <b-button class="name-button"  v-b-modal.modal-prevent-closing>add name</b-button>
      <div class="mt-3">
      </div>
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Submit Your Name"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
            :state="nameState"
          >
            <b-form-input
              id="name-input"
              v-model="name"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
    </div>
  </template>
<script>
import { Api } from '@/Api'
export default {
  data() {
    return {
      name: '',
      nameState: null,
      submittedNames: []
    }
  },
  methods: {
    createName() {
      const newName = {
        _id: this.name,
        likes: 0,
        dislikes: 0,
        comments: [],
        tags: []
      }
      Api.post('v1/names', newName)
        .catch(error => {
          console.log(error)
        })
      this.$router.push('/name/' + this.name)
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      this.createName()
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}

</script>
<style>
  @media(max-width: 768px){
    .name-button{
  width: 100px;
  height: 40px;
  padding: 1px;
  margin-left: -28px;
  margin-top: -4px;
  margin-bottom: 4px;
  font-size: 5px;
  text-align: center;
    }
  }
  </style>
