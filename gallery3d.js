document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery script loaded');
    
    // Define your selected images
    const selectedImages = [
        'poza1.jpg',
        'poza3.jpg',
        'poza4.jpg',
        'poza6.jpg',
        'poza solo1.jpg',
        'poza solo3.jpg'
    ];
    
    // Initialize galleries with your selected images
    initGallery('gallery3d-1', selectedImages);
    initGallery('gallery3d-2', [...selectedImages].reverse());
    
    function initGallery(containerId, imagePaths) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container #${containerId} not found`);
            return;
        }
        
        console.log(`Initializing gallery ${containerId}`);
        
        // Setup Three.js
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0); // Transparent background
        container.appendChild(renderer.domElement);
        
        // Create a group for the images
        const group = new THREE.Group();
        scene.add(group);
        
        // Create image planes in a circular arrangement
        const radius = 4;
        const numImages = imagePaths.length;
        
        for (let i = 0; i < numImages; i++) {
            const angle = (i / numImages) * Math.PI * 2;
            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);
            
            // Create plane with image texture
            const geometry = new THREE.PlaneGeometry(2, 2);
            const textureLoader = new THREE.TextureLoader();
            
            // Create a colored material as fallback
            const colors = [0xff9999, 0x99ff99, 0x9999ff, 0xffff99, 0xff99ff, 0x99ffff];
            const fallbackColor = colors[Math.floor(Math.random() * colors.length)];
            const material = new THREE.MeshBasicMaterial({ 
                color: fallbackColor,
                side: THREE.DoubleSide
            });
            
            const plane = new THREE.Mesh(geometry, material);
            
            // Position the plane
            plane.position.set(x, 0, z);
            
            // Rotate plane to face center
            plane.lookAt(0, 0, 0);
            
            // Add plane to group
            group.add(plane);
            
            // Try to load the image texture
            textureLoader.load(
                imagePaths[i],
                function(texture) {
                    console.log(`Successfully loaded: ${imagePaths[i]}`);
                    // Replace the material with the texture
                    plane.material = new THREE.MeshBasicMaterial({
                        map: texture,
                        side: THREE.DoubleSide
                    });
                },
                undefined,
                function(error) {
                    console.error(`Failed to load: ${imagePaths[i]}`, error);
                    // Keep the colored material as fallback
                }
            );
        }
        
        // Position camera
        camera.position.z = 6;
        
        // Add mouse/touch interaction
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousMousePosition = {
                x: e.clientX,
                y: e.clientY
            };
        });
        
        container.addEventListener('touchstart', (e) => {
            isDragging = true;
            previousMousePosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        });
        
        window.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        window.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaMove = {
                    x: e.clientX - previousMousePosition.x
                };
                
                group.rotation.y += deltaMove.x * 0.01;
                
                previousMousePosition = {
                    x: e.clientX,
                    y: e.clientY
                };
            }
        });
        
        window.addEventListener('touchmove', (e) => {
            if (isDragging && e.touches.length > 0) {
                const deltaMove = {
                    x: e.touches[0].clientX - previousMousePosition.x
                };
                
                group.rotation.y += deltaMove.x * 0.01;
                
                previousMousePosition = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                };
            }
        });
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Auto-rotation when not interacting
            if (!isDragging) {
                group.rotation.y += 0.003;
            }
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (container) {
                const width = container.clientWidth;
                const height = container.clientHeight;
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
            }
        });
    }
});
