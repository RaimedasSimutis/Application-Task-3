<template>
  <section class="forecast-week">
    <title-with-stats :title="title"/>
    <div v-if="weatherData && weatherData.length" class="forecast-week__content">
      <div
        v-for="(day, index) in weatherData"
        :key="index"
        class="forecast-week__day-forecast"
      >
        <div class="forecast-week__day-name">
          {{ day.day }}
        </div>

        <div v-if="day.icon" class="forecast-week__icon">
          <img  :src="`http://openweathermap.org/img/wn/${day.icon}.png`" alt="icn"/>
        </div>

        <div class="forecast-week__stats">
          <div class="forecast-week__stat">
            {{day.temperatureDay}}
          </div>
          <div class="forecast-week__stat forecast-week__stat--darken">
            {{day.temperatureNight}}
          </div>
        </div>
      </div>
    </div>
    <chart v-if="weatherData && weatherData.length" style="height: 35px" :chartdata="chartData" :options="chartOptions"/>
  </section>
</template>

<script>
import TitleWithStats from './TitleWithStats'
import Chart from './Chart'
export default {
  name: 'WeekForecast',
  components: { Chart, TitleWithStats },
  props: {
    weatherData: {
      type: Array,
      required: true
    },
    title: {
      type: String
    }
  },
  data () {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 4,
        legend: {
          display: false
        },
        scaleLabel: {
          display: false
        },
        scales: {
          yAxes: [{
            display: false,
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              drawBorder: false
            }
          }],
          xAxes: [{
            display: false,
            categoryPercentage: 1,
            barPercentage: 0.98,
            gridLines: {
              drawBorder: false
            }
          }]
        }
      }
    }
  },
  computed: {
    chartData () {
      return {
        // labels: ['1', '1', '1', '1', '1', '1', '1'],
        labels: this.weatherData.map(day => day.day),
        datasets: [
          {
            label: 'Day',
            backgroundColor: '#AC8142',
            borderColor: '#F1961C',
            borderSkipped: 'bottom',
            borderWidth: {
              top: 2,
              right: 0,
              bottom: 2,
              left: 0
            },
            // data: [25, 20, 40, -20, 40, 20, 40]
            data: this.weatherData.map(day => day.temperatureDay)
          },
          {
            label: 'Night',
            backgroundColor: '#667997',
            borderColor: '#6B87BC',
            borderSkipped: 'bottom',
            borderWidth: {
              top: 2,
              right: 0,
              bottom: 2,
              left: 0
            },
            data: this.weatherData.map(day => day.temperatureNight)
          }
        ]
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .forecast-week {

    &__content {
      display: flex;
      justify-content: space-between;
      padding: 10px 10px 5px 10px;
    }

    &__day-forecast {
      width: 32px;
    }

    &__day-name {
      font-size: 11px;
      text-align: center;
      margin-bottom: 1px;
    }

    &__icon {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 35px;
        height: 35px;
      }
    }

    &__stats {
      display: flex;
      justify-content: space-around;
    }

    &__stat {
      font-size: 10px;

      &--darken {
        color: $text-grey-light;
      }
    }

    &__stat {
      font-size: 10px;
    }
  }
</style>
