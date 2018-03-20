<template>
  <div>
    <canvas id="c" width="1346" height="580"></canvas>
  </div>
</template>
<script>
  export default {
    // 钩子
    mounted () {
      try{
        var c = document.getElementById('c')
        var s = c.width = window.innerWidth-20
          , ctx = c.getContext( '2d' )
          , opts = {
          particles: 200,
          particleBaseSize: 4,
          particleAddedSize: 1,
          particleMaxSize: 5,
          particleBaseLight: 5,
          particleAddedLight: 30,
          particleBaseBaseAngSpeed: .001,
          particleAddedBaseAngSpeed: .001,
          particleBaseVariedAngSpeed: .0005,
          particleAddedVariedAngSpeed: .0005,
          sourceBaseSize: 3,
          sourceAddedSize: 3,
          sourceBaseAngSpeed: -.01,
          sourceVariedAngSpeed: .005,
          sourceBaseDist: 130,
          sourceVariedDist: 50,

          particleTemplateColor: '#fff',/*hsla(hue,80%,light%,alp)*/
          repaintColor: 'rgba(0,0,0,.1)',
          enableTrails: false
        }

          , util = {
          square: function(x){ return x*x},
          tau: 6.2831853071795864769252867665590057683943
        }

          , particles = []
          , source = new Source
          , tick = 0;

        function Particle() {
          this.dist = ( Math.sqrt( Math.random() ) ) * s / 2;
          this.rad = Math.random() * util.tau;

          this.baseAngSpeed = opts.particleBaseBaseAngSpeed + opts.particleAddedBaseAngSpeed * Math.random();
          this.variedAngSpeed = opts.particleBaseVariedAngSpeed + opts.particleAddedVariedAngSpeed * Math.random();
          this.size = opts.particleBaseSize + opts.particleAddedSize * Math.random();
        }
        Particle.prototype.step = function() {
          var angSpeed = this.baseAngSpeed + this.variedAngSpeed * Math.sin( this.rad * 7 + tick / 100 );
          this.rad += angSpeed;

          var x = this.dist * Math.cos( this.rad )
            , y = this.dist * Math.sin( this.rad )

            , squareDist = util.square( x - source.x ) + util.square( y - source.y )
            , sizeProp = Math.pow( s, 1/2 ) / Math.pow( squareDist, 1/2 )
            , color = opts.particleTemplateColor
            .replace( 'hue', this.rad / util.tau * 360 + tick )
            .replace( 'light', opts.particleBaseLight + sizeProp * opts.particleAddedLight )
            .replace( 'alp', .8 );

          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc( x, y, Math.min( this.size * sizeProp, opts.particleMaxSize ), 0, util.tau );
          ctx.fill();
        }

        function Source() {
          this.x = 0;
          this.y = 0;
          this.rad = Math.random() * util.tau;
        }
        Source.prototype.step = function() {

          if( !this.mouseControlled ) {
            var angSpeed = opts.sourceBaseAngSpeed + Math.sin( this.rad * 6 + tick / 100 ) * opts.sourceVariedAngSpeed;
            this.rad += angSpeed;

            var dist = opts.sourceBaseDist + Math.sin( this.rad * 5 + tick / 100 ) * opts.sourceVariedDist;

            this.x = dist * Math.cos( this.rad );
            this.y = dist * Math.sin( this.rad );
          }

          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc( this.x, this.y, 1, 0, util.tau );
          ctx.fill();
        }

        function anim() {

          window.requestAnimationFrame( anim );

          ++tick;

          if( !opts.enableTrails )
            ctx.globalCompositeOperation = 'source-over';

          //ctx.fillStyle = opts.repaintColor;
          //ctx.fillRect( 0, 0, s, s );
          ctx.clearRect(0,0,c.width,c.height);

          ctx.globalCompositeOperation = 'lighter';

          if( particles.length < opts.particles )
            particles.push( new Particle );

          ctx.translate( s/2, s/2 );

          source.step();

          particles.map( function(particle){
            return particle.step()
          });
          ctx.translate( -s/2, -s/2 );
        }

        //ctx.fillStyle = '#222';
        //ctx.fillRect( 0, 0, s, s );
        anim();

        c.addEventListener( 'mousemove', function( e ){

          var bbox = c.getBoundingClientRect();

          source.x = e.clientX - bbox.left - s/2;
          source.y = e.clientY - bbox.top - s/2;
          source.mouseControlled = true;
        })
        c.addEventListener( 'mouseleave', function( e ){

          var bbox = c.getBoundingClientRect();

          source.x = e.clientX - bbox.left - s/2;
          source.y = e.clientY - bbox.top - s/2;

          source.rad = Math.atan( source.y / source.x );
          if( source.x < 0 )
            source.rad += Math.PI;

          source.mouseControlled = false;
        })

      }catch(err){
      };
    }
  }
</script>
