<template>
  <div class="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot class="header"> </slot>
          </div>
          <div class="modal-body">
            <slot name="body"> </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"> </slot>
            <button class="modal-default-button" @click="$emit('close')">
              完成
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
    .modal-wrapper {
      position: absolute;
      display: flex;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content: center;
      .modal-container {
        display: flex;
        padding: 20px 30px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: white;
        div {
          padding: 10px;
          display: flex;
        }
      }
    }
  }
}
</style>
