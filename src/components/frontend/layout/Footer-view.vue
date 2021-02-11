<template>
  <div id="footer" class="row bg-info">
   <div class="m-auto">
      <mdb-footer color="unique-color-dark" class="page-footer font-small pt-0">
      <div style="backgroundcolor: #6351ce">
        <mdb-container class="text-left">
          <mdb-row class="py-4 d-flex align-items-center">
            <mdb-col
              md="6"
              lg="5"
              class="text-center text-md-left mb-4 mb-md-0"
            >
              <h6 class="mb-0 white-text">
                با ما در شبکه های اجتماعی ارتباط برقرار کنید!
              </h6>
            </mdb-col>
            <mdb-col md="6" lg="7" class="text-center text-md-right">
              <a class="fb-ic ml-0"
                >instagram<i class="fab fa-facebook white-text mr-lg-4"> </i
              ></a>
              <a class="tw-ic"
                ><i class="fab fa-twitter white-text mr-lg-4"> </i>telegram</a
              >
              <a class="gplus-ic"
                ><i class="fab fa-google-plus white-text mr-lg-4"> </i
                >youtube</a
              >
              <a class="li-ic"
                ><i class="fab fa-linkedin-in white-text mr-lg-4"> </i
              ></a>
              <a class="ins-ic"
                ><i class="fab fa-instagram white-text mr-lg-4"> </i
              ></a>
            </mdb-col>
          </mdb-row>
        </mdb-container>
      </div>
      <mdb-container class="mt-5 mb-4 text-center text-md-left">
        <mdb-row class="mt-3">
          <mdb-col md="3" lg="4" xl="3" class="mb-4">
            <h6 class="text-uppercase font-weight-bold">
              <strong>نام شرکت</strong>
            </h6>
            <hr
              class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style="width: 60px"
            />
            <p>
              Here you can use rows and columns here to organize your footer
              content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </mdb-col>
          <!-- <mdb-col md="2" lg="2" xl="2" class="mb-4">
            <h6 class="text-uppercase font-weight-bold">
              <strong>Products</strong>
            </h6>
            <hr
              class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style="width: 60px"
            />
            <p><a href="#!">MDBootstrap</a></p>
            <p><a href="#!">MDWordPress</a></p>
            <p><a href="#!">BrandFlow</a></p>
            <p><a href="#!">Bootstrap Angular</a></p>
          </mdb-col> -->
          <mdb-col md="3" lg="2" xl="2" class="mb-4">
            <h6 class="text-uppercase font-weight-bold">
              <strong>لینک های مفید</strong>
            </h6>
            <hr
              class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style="width: 60px"
            />
            <p><a href="#!">Your Account</a></p>
            <p><a href="#!">Become an Affiliate</a></p>
            <p><a href="#!">Shipping Rates</a></p>
            <p><a href="#!">Help</a></p>
          </mdb-col>
          <mdb-col md="4" lg="3" xl="3" class="mb-4">
            <h6 class="text-uppercase font-weight-bold">
              <strong>مخاطب</strong>
            </h6>
            <hr
              class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style="width: 60px"
            />
            <p><i class="fas fa-home mr-3"></i> New York, NY 10012, US</p>
            <p><i class="fas fa-envelope mr-3"></i> info@example.com</p>
            <p><i class="fas fa-phone mr-3"></i> + 01 234 567 88</p>
            <p><i class="fas fa-print mr-3"></i> + 01 234 567 89</p>
          </mdb-col>
        </mdb-row>
      </mdb-container>
    </mdb-footer>
   </div>
  </div>
</template>

<script>
import { mdbFooter, mdbContainer, mdbRow, mdbCol } from "mdbvue";
export default {
  name: "Footer",
  components: {
    mdbFooter,
    mdbContainer,
    mdbRow,
    mdbCol,
  },
};
</script>

<style scoped>
#footer {
  padding: auto;
  position: relative;
  z-index: 3;
  direction: rtl;
  text-align: right;
  opacity: 0.85;
}
</style>
