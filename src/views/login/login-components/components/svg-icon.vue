<template>
  <!-- 切换二维码和传统登录 -->
  <i>
    <!-- <svg v-if="icon === 'qrcode'" version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="44px" height="44px" viewBox="0 0 44 44" enable-background="new 0 0 44 44" xml:space="preserve">
      <g>
        <g>
          <path
            fill="currentColor"
            d="M23.568,43.992h3.142v-3.139h-3.142V43.992z M6.17,16.921h10.828V0.007H-0.011v16.914H3.08l0.051,3.509
			h3.142L6.17,16.921z M3.08,13.844V3.079h10.828v10.765H3.08z M26.997,0.007v17.002h17.014V0.007H26.997z M40.916,13.916H30.087
			V3.096h10.829V13.916z M6.175,10.766h4.642V6.151H6.175V10.766z M6.278,20.43v3.141h3.147V20.43H6.278z M10.817,33.229H6.175
			v4.614h4.642V33.229z M37.825,6.184h-4.642v4.639h4.642V6.184z M3.131,20.43h-3.142v3.141h3.142V20.43z M26.716,40.854h3.142
			v-9.431h-3.142V40.854z M23.568,26.709h-3.143v4.714h3.143V26.709z M23.568,1.577h-3.143v4.715h3.143V1.577z M23.568,9.432h-3.143
			v3.139h3.143V9.432z M20.426,34.568v6.285h3.143v-6.285H20.426z M36.146,43.992h7.859v-3.139h-7.859V43.992z M33.004,37.708v3.146
			h3.143v-3.146H33.004z M40.864,34.568h-1.57v3.14h3.142v-3.14h1.57v-3.14h-3.142V34.568z M40.864,23.57h3.142V20.43h-3.142V23.57z
			 M36.146,29.85h7.859v-3.141h-7.859V29.85z M33.004,34.563h3.143v-3.14h-3.143V34.563z M33.004,29.85v-3.141h-3.146v3.141H33.004z
			 M23.568,20.43v-4.714h-3.143v4.714h-7.859v3.141h14.149v3.139h3.142V20.43H23.568z M39.294,20.43h-6.29v3.141h6.29V20.43z
			 M9.272,27.08h-9.283v16.913h17.014V27.08h-4.641l0.205-3.51H9.425L9.272,27.08z M13.908,30.156v10.765H3.08V30.156H13.908z"
          />
        </g>
      </g>
    </svg> -->
    <svg
      v-if="icon === 'qrcode'"
      version="1.1"
      id="图层_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="66px"
      height="66px"
      viewBox="0 0 66 66"
      enable-background="new 0 0 66 66"
      xml:space="preserve"
    >
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stop-color="#fff" />
          <stop offset="100%" stop-color="#fff" />
        </linearGradient>
      </defs>
      <g>
        <g>
          <path
            fill="url(#gradient)"
            d="M17.172,27.92h10.827V11.007H10.99V27.92h3.091l0.051,3.51h3.142L17.172,27.92z M14.081,24.843V14.079
			h10.827v10.764H14.081z M34.568,54.993h3.143v-3.141h-3.143V54.993z M17.177,21.766h4.641v-4.614h-4.641V21.766z M37.997,11.007
			v17.002h17.014V11.007H37.997z M51.916,24.915H41.088v-10.82h10.828V24.915z M17.278,31.43v3.14h3.147v-3.14H17.278z
			 M14.132,31.43h-3.143v3.14h3.143V31.43z M21.817,44.229h-4.641v4.614h4.641V44.229z M48.825,17.184h-4.641v4.638h4.641V17.184z
			 M31.427,45.568v6.284h3.142v-6.284H31.427z M44.005,48.708v3.145h3.143v-3.145H44.005z M44.005,40.849v-3.14h-3.147v3.14H44.005z
			 M47.147,40.849h7.859v-3.14h-7.859V40.849z M34.568,12.576h-3.142v4.715h3.142V12.576z M51.865,34.569h3.142v-3.14h-3.142V34.569
			z M34.568,20.431h-3.142v3.14h3.142V20.431z M51.865,45.568h-1.571v3.14h3.143v-3.14h1.57v-3.14h-3.142V45.568z M20.272,38.079
			H10.99v16.914h17.014V38.079h-4.641l0.204-3.51h-3.142L20.272,38.079z M24.908,41.156V51.92H14.081V41.156H24.908z M44.005,45.563
			h3.143v-3.14h-3.143V45.563z M34.568,31.43v-4.714h-3.142v4.714h-7.859v3.14h14.148v3.14h3.142V31.43H34.568z M37.716,51.853
			h3.142v-9.43h-3.142V51.853z M50.294,31.43h-6.289v3.14h6.289V31.43z M34.568,37.709h-3.142v4.714h3.142V37.709z M47.147,54.993
			h7.859v-3.141h-7.859V54.993z"
          />
        </g>
      </g>
    </svg>
    <!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <!-- <svg v-if="icon === 'form'" version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="44px" height="44px" viewBox="0 0 44 44" enable-background="new 0 0 44 44" xml:space="preserve">
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stop-color="#F00" />
          <stop offset="100%" stop-color="#00F" />
        </linearGradient>
      </defs>
      <g>
        <g>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="currentColor"
            d="M41.19,2.987H2.81c-1.557,0-2.818,1.271-2.818,2.84V29.07
			c0,1.516,1.262,2.745,2.818,2.745h17.581v6.061h-7.255c-0.859,0.001-1.556,0.702-1.556,1.569c0.001,0.865,0.697,1.566,1.556,1.567
			h17.665c0.86,0,1.557-0.702,1.557-1.568s-0.696-1.568-1.557-1.568h-7.298v-6.061H41.19c1.556,0,2.818-1.229,2.818-2.745V5.828
			C44.009,4.259,42.746,2.987,41.19,2.987z M40.989,29.003H3.009L3.004,6h38L40.989,29.003z M39.004,8h-34v19h34V8z"
          />
        </g>
      </g>
    </svg> -->
    <svg
      v-if="icon === 'login'"
      version="1.1"
      id="图层_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="66px"
      height="66px"
      viewBox="0 0 66 66"
      enable-background="new 0 0 66 66"
      xml:space="preserve"
    >
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stop-color="#fff" />
          <stop offset="100%" stop-color="#fff" />
        </linearGradient>
      </defs>
      <g>
        <g>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="url(#gradient)"
            d="M50.189,14.987H15.81c-1.557,0-2.818,1.271-2.818,2.841V41.07
			c0,1.516,1.262,2.746,2.818,2.746h15.581v4.059h-6.256c-0.858,0.002-1.555,0.703-1.555,1.57c0.001,0.865,0.696,1.566,1.555,1.568
			h15.666c0.86,0,1.557-0.703,1.557-1.568c0-0.867-0.696-1.57-1.557-1.57h-6.298v-4.059h15.687c1.557,0,2.819-1.23,2.819-2.746
			V17.828C53.009,16.258,51.746,14.987,50.189,14.987z M49.988,41.002H16.01L16.004,18h34L49.988,41.002z M48.004,36h-30v3h30V36z"
          />
        </g>
      </g>
    </svg>
  </i>
</template>

<script lang="ts" setup>
defineProps({ icon: { type: String, default: '' } })
</script>
<style></style>
