<?php

use App\Models\Counter;

it('displays counter on home page', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('welcome')
        ->has('count')
    );
});

it('displays zero count initially', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->where('count', 0)
    );
});

it('increments counter when increment route is called', function () {
    $response = $this->post('/increment');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('welcome')
        ->where('count', 1)
    );

    $this->assertDatabaseHas('counters', [
        'count' => 1
    ]);
});

it('decrements counter when decrement route is called', function () {
    // Create a counter with value 5
    Counter::factory()->create(['count' => 5]);

    $response = $this->post('/decrement');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->component('welcome')
        ->where('count', 4)
    );

    $this->assertDatabaseHas('counters', [
        'count' => 4
    ]);
});

it('handles multiple increments', function () {
    // Increment 3 times
    $this->post('/increment');
    $this->post('/increment');
    $response = $this->post('/increment');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->where('count', 3)
    );
});

it('allows counter to go negative', function () {
    // Decrement from zero
    $response = $this->post('/decrement');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => $page
        ->where('count', -1)
    );
});

it('persists counter value across requests', function () {
    // Increment the counter
    $this->post('/increment');

    // Check that it persists on page load
    $response = $this->get('/');
    $response->assertInertia(fn ($page) => $page
        ->where('count', 1)
    );
});