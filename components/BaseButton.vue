<template>
  <component
    :is="tag"
    :type="type"
    :loading="loading"
    :disabled="disabled"
    :class="[btnClass, colorVariants]"
    :variant="variant"
    :variant-type="variantType"
    :size="size"
    :href="to"
    v-on="$listeners"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'primary'
    },
    variantType: {
      type: String,
      default: 'normal'
    },
    size: {
      type: String,
      default: 'normal'
    },
    rounded: {
      type: String,
      default: 'medium'
    },
    type: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      buttonLoading: this.loading
    }
  },
  computed: {
    btnClass() {
      return {
        'base-spinner pointer-events-none': this.loading === true,
        'cursor-not-allowed': this.disabled === true,
        'base-button inline-flex align-middle align-items-center justify-center font-medium focus:outline-none border-2': true,

        'rounded-md': this.rounded === 'medium',
        'rounded-full': this.rounded === 'full',

        'px-3 py-1 text-sm': this.size === 'small',
        'px-4 py-2': this.size === 'normal',
        'px-6 py-3': this.size === 'large'
      }
    },
    colorVariants() {
      return this.color(this.variant)
    }
  },
  methods: {
    color(variant) {
      switch (variant) {
        case 'primary':
          switch (this.variantType) {
            case 'normal':
              switch (this.disabled) {
                case true:
                  return 'border-gray-300 bg-gray-300 text-white'
                default:
                  break
              }
              return 'border-gray-800 bg-gray-800 hover:bg-gray-900 hover:border-gray-900 text-white'
            case 'outline':
              return 'border-gray-200 text-gray-700 hover:text-gray-900'
            default:
              break
          }
          break
        case 'danger':
          switch (this.variantType) {
            case 'normal':
              switch (this.disabled) {
                case true:
                  return 'border-red-300 bg-red-300 text-white'
                default:
                  break
              }
              return 'border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700 text-white'
            case 'outline':
              return 'border-gray-200 text-red-500 hover:text-red-600'
            default:
              break
          }
          break

        case 'warning':
          switch (this.variantType) {
            case 'normal':
              return 'border-yellow-600 bg-yellow-600 hover:bg-yellow-700 hover:border-yellow-700 text-white'
            default:
              break
          }
          break

        case 'success':
          switch (this.variantType) {
            case 'normal':
              switch (this.disabled) {
                case true:
                  return 'border-green-300 bg-green-300 text-white'
                default:
                  break
              }
              return 'border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700 text-white'
            case 'outline':
              return 'border-2 border-gray-200 text-green-500 hover:text-green-700'
            default:
              break
          }
          break

        case 'white':
          switch (this.variantType) {
            case 'normal':
              return 'border-white bg-white text-blue-600 hover:text-blue-800'
            default:
              break
          }
          break

        case 'secondary':
          switch (this.variantType) {
            case 'normal':
              return 'border-gray-300 text-gray-600 hover:text-text-700 hover:border-gray-400'
            case 'outline':
              return 'border-gray-300 text-gray-500 hover:text-blue-500'
            default:
              break
          }
          break

        default:
          break
      }
    }
  }
}
</script>

<style>
.base-button + .base-button {
  margin-left: 1em;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.base-spinner {
  position: relative;
  overflow: hidden;
}

.base-spinner:before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  background-color: inherit;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
  top: 0;
  left: 0;
}

.base-spinner:after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: inherit;
  animation: spinner 0.6s linear infinite;
  z-index: 2;
}
</style>
