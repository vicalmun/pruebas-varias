// Variables for setup

let container;
let camera;
let renderer;
let scene;
let house;

function init(){
    container = document.querySelector('.scene');

    //Añadir la escena al contenedor
    
    // crear la escena
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    // definimos los límites de visión (en metros)
    const near = 0.1;
    const far = 1000;

    // Set up camera
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0,3,20);
   

    // Luces para poder ver algo
    const ambient = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff,2);
    light.position.set(20,20,20);
    scene.add(light);

    // Renderer
    renderer = new THREE.WebGLRenderer({antialias:true, alpha: true}); //según he entendido el antialias ayuda al renderizado
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // esto añade todo lo que hemos creado al HTML
    container.appendChild(renderer.domElement);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', renderer);

    // Load model
    let  loader = new THREE.GLTFLoader();
    loader.load('./marina/scene.gltf', function(gltf){
        // Aquí añadimos el modelo a la escena
        scene.add(gltf.scene);
        house = gltf.scene.children[0];
        animate();
    });

    function animate(){
        requestAnimationFrame(animate);
        house.rotation.z += 0.005;
        renderer.render(scene, camera);
    }
}

init();

function onWndowResize(){
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWndowResize);